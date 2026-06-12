import {
  Button,
  Typography,
  Grid,
  Paper,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  LinearProgress,
  Alert,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import View from "./View";
import { useState, useEffect } from "react";
import { useQuery, useMutation } from "@apollo/client/react";
import {
  SearchResultPropsFragment,
  DeleteEntryDocument,
  FindItemDocument,
  FindTagsDocument,
} from "../generated/graphql";
import { Domain } from "../domain";
import { useSnackbar } from "notistack";
import { T, useTranslate } from "@tolgee/react";
import DeleteIcon from "@mui/icons-material/Delete";
import WarningIcon from "@mui/icons-material/Warning";
import {
  DataGrid,
  GridColDef,
  GridRenderCellParams,
  GridRowSelectionModel,
  GridPaginationModel,
} from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";

const SEARCH_PAGE_SIZE = 100;

export function DeleteImportView() {
  const navigate = useNavigate();
  const { t } = useTranslate();
  const [tag, setTag] = useState<string>("");
  const [tagId, setTagId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [output, setOutput] = useState<React.ReactNode>("");
  const [deleteEntry] = useMutation(DeleteEntryDocument);
  const [records, setRecords] = useState<SearchResultPropsFragment[]>([]);
  const [selectedRows, setSelectedRows] = useState<GridRowSelectionModel>({
    type: "include",
    ids: new Set<string>(),
  });
  const [currentRecordIds, setCurrentRecordIds] = useState<string[]>([]);
  const [excludedRecordIds, setExcludedRecordIds] = useState<Set<string>>(new Set());
  const [selectAllPages, setSelectAllPages] = useState(false);
  const [progress, setProgress] = useState(0);
  const [pageNumber, setPageNumber] = useState(0);
  const [totalElements, setTotalElements] = useState(0);
  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
    pageSize: SEARCH_PAGE_SIZE,
    page: 0,
  });

  const { enqueueSnackbar } = useSnackbar();

  // Get all tags in database
  const { data: tagsData, loading: tagsLoading } = useQuery(FindTagsDocument, {
    variables: {
      pageSize: 100,
    },
  });

  // Search entries with properties
  const { data: searchData, refetch, loading: searchLoading, error, fetchMore } = useQuery(FindItemDocument, {
    variables: {
      input: {
        tagged: [tagId],
      },
      pageSize: paginationModel.pageSize,
      pageNumber,
    },
    skip: !tagId,
    fetchPolicy: "cache-first",
  });
  useEffect(() => {
    if (error) {
      enqueueSnackbar(t("delete_import_view.search_error"), {
        variant: "error",
      });
    }
  }, [error, enqueueSnackbar, t]);

  const tagList = tagsData?.findTags.nodes ?? [];

  const normalizeSearchRecords = (nodes: any[]) =>
    nodes.map((record: any) => {
      if (record.recordType === "Dictionary" && record.dname?.texts?.length > 0) {
        return {
          ...record,
          name: record.dname.texts[0].text,
        };
      }
      return record;
    });

  useEffect(() => {
    setPageNumber(0);
    setTotalElements(0);
    setPaginationModel({
      pageSize: SEARCH_PAGE_SIZE,
      page: 0,
    });
    setRecords([]);
    setCurrentRecordIds([]);
    setExcludedRecordIds(new Set());
    setSelectAllPages(false);
    setSelectedRows({ type: "include", ids: new Set<string>() });
    setOutput("");
  }, [tagId]);

  useEffect(() => {
    if (!tagId || !searchData) return;

    const foundRecords = normalizeSearchRecords(searchData.search?.nodes ?? []);
    const foundRecordIds = foundRecords.map((record: SearchResultPropsFragment) => record.id);
    setRecords(foundRecords);
    setCurrentRecordIds(foundRecordIds);
    setTotalElements(searchData.search?.totalElements ?? 0);
    setSelectAllPages(true);

    if (foundRecords.length === 0) {
      setOutput(
        <Alert severity="info">
          <T keyName="delete_import_view.no_entries_found" />
        </Alert>
      );
    } else {
      setOutput("");
      selectAllCurrentPage(foundRecords);
      setSelectedRows({
        type: "include",
        ids: new Set(getVisibleSelectedIds(foundRecordIds)),
      });
    }
  }, [searchData, tagId]);

  const selectAllCurrentPage = (currentRecords: SearchResultPropsFragment[]) => {
    setSelectedRows({
      type: "include",
      ids: new Set(currentRecords.map((record: SearchResultPropsFragment) => record.id)),
    });
  };

  const getVisibleSelectedIds = (ids: string[]) =>
    ids.filter((id) => !excludedRecordIds.has(id));

  const getDeleteCount = () => {
    if (!selectAllPages) return selectedRows.ids.size;
    return Math.max(totalElements - excludedRecordIds.size, 0);
  };

  const handlePaginationModelChange = async (model: GridPaginationModel) => {
    setPaginationModel(model);
    setPageNumber(model.page);
    setSelectedRows({ type: "include", ids: new Set<string>() });

    if (!tagId) return;

    try {
      const result = await fetchMore({
        variables: {
          input: {
            tagged: [tagId],
          },
          pageSize: model.pageSize,
          pageNumber: model.page,
        },
      });

      const foundRecords = normalizeSearchRecords(result.data?.search?.nodes ?? []);
      const foundRecordIds = foundRecords.map((record: SearchResultPropsFragment) => record.id);
      setCurrentRecordIds(foundRecordIds);
      setRecords(foundRecords);

      if (selectAllPages) {
        setSelectedRows({
          type: "include",
          ids: new Set(getVisibleSelectedIds(foundRecordIds)),
        });
      }
    } catch (error) {
      console.error("Error fetching search page:", error);
      setOutput(
        <Alert severity="error">
          <T keyName="delete_import_view.search_error" />
        </Alert>
      );
    }
  };

  const handleRowSelectionModelChange = (newModel: GridRowSelectionModel) => {
    setSelectedRows(newModel);

    if (!selectAllPages) return;

    const selectedIds = new Set(Array.from(newModel.ids));
    const currentIds = new Set(currentRecordIds);

    setExcludedRecordIds((prev) => {
      const next = new Set(prev);

      currentIds.forEach((id) => {
        if (selectedIds.has(id)) {
          next.delete(id);
        } else {
          next.add(id);
        }
      });

      return next;
    });
  };

  const fetchAllRecordIds = async (): Promise<string[]> => {
    if (!tagId) return [];

    const ids: string[] = [];
    let currentPage = 0;
    let hasNextPage = true;

    while (hasNextPage) {
      const result = await refetch({
        input: {
          tagged: [tagId],
        },
        pageSize: SEARCH_PAGE_SIZE,
        pageNumber: currentPage,
      });

      const nodes = result.data?.search?.nodes ?? [];
      ids.push(...nodes.map((record: SearchResultPropsFragment) => record.id));
      hasNextPage = result.data?.search?.pageInfo?.hasNext ?? false;
      currentPage++;
    }

    return ids;
  };

  // Open confirmation dialog before deletion
  const handleOpenDeleteDialog = () => {
    setIsDeleteDialogOpen(true);
  };

  // Delete selected entries, including records that were not loaded in the table
  const handleDeleteEntries = async () => {
    setIsDeleteDialogOpen(false);

    const deleteCount = getDeleteCount();

    if (deleteCount === 0) {
      enqueueSnackbar(t("delete_import.no_entries_selected"), {
        variant: "info",
      });
      return;
    }

    setIsLoading(true);
    setProgress(0);

    try {
      const allRecordIds = await fetchAllRecordIds();
      const recordIds = selectAllPages
        ? allRecordIds.filter((id) => !excludedRecordIds.has(id))
        : Array.from(selectedRows.ids).filter((id) => allRecordIds.includes(id));

      if (recordIds.length === 0) {
        enqueueSnackbar(t("delete_import.no_entries_selected"), {
          variant: "info",
        });
        return;
      }

      let successCount = 0;
      let errorCount = 0;

      for (let i = 0; i < recordIds.length; i++) {
        const recordId = recordIds[i];

        try {
          await deleteEntry({
            variables: { id: String(recordId) },
          });
          successCount++;
          // enqueueSnackbar(
          //   <T
          //     keyName="delete_import_view.delete_success"
          //   />,
          //   { variant: "success" }
          // );
        } catch (error) {
          errorCount++;
          console.error(`Error deleting entry: `, error);
        }

        setProgress(Math.round(((i + 1) / recordIds.length) * 100));
      }

      if (successCount > 0) {
        enqueueSnackbar(
          <T
            keyName="delete_import_view.delete_summary"
            params={{ count: successCount, total: recordIds.length }}
          />,
          { variant: "success" }
        );

        setSelectedRows({ type: "include", ids: new Set<string>() });
      }

      if (errorCount > 0) {
        setOutput(
          <Alert severity="warning">
            <T
              keyName="delete_import_view.delete_error_summary"
              params={{ count: errorCount, total: recordIds.length }}
            />
          </Alert>
        );
      } else {
        setRecords([]);
        setCurrentRecordIds([]);
        setExcludedRecordIds(new Set());
        setSelectAllPages(false);
        setTotalElements(0);
        setTag("");
        setTagId("");
      }
    } catch (error) {
      console.error("Error in delete operation:", error);
      setOutput(
        <Alert severity="error">
          <T keyName="delete_import_view.error_occurred" />
        </Alert>
      );
    } finally {
      setIsLoading(false);
      setProgress(0);
    }
  };

  // Navigation handler for clicking on entries - updated to match GridViewView behavior
  const handleEntityClick = (tags: any[], id: string) => {
    let entityPath = "import";
    const recordTags: string[] = tags.map(tag => tag.id);
    for (const entity of Domain) {
      if (entity.tags && entity.tags.some(entityTag => recordTags.includes(entityTag))) {
        entityPath = entity.path;
      }
    }
    navigate(`/${entityPath}/${id}`);
    window.location.reload();
  };

  // DataGrid columns configuration
  const columns: GridColDef[] = [
    {
      field: "name",
      headerName: "Name",
      flex: 2,
      renderCell: (params: GridRenderCellParams) => (
        <Box
          sx={{
            cursor: "pointer",
            color: "primary.main",
            "&:hover": { textDecoration: "underline" },
          }}
          onClick={() =>
            handleEntityClick(params.row.tags, params.row.id)
          }
        >
          {params.value}
        </Box>
      ),
    },
    { field: "recordType", headerName: "Type", flex: 1 },
    {
      field: "tags",
      headerName: "Tags",
      flex: 2,
      renderCell: (params: GridRenderCellParams) => {
        const tags = params.row.tags;
        if (!tags) return <span style={{ color: "gray" }}>No tags</span>;

        const tagArray = Array.isArray(tags) ? tags : [tags];
        const tagNames = tagArray.map((tag: any) => tag.name);

        return tagNames.length > 0
          ? <span>{tagNames.join(", ")}</span>
          : <span style={{ color: "gray" }}>No tags</span>;
      },
    },
  ];

  return (
    <View heading={<T keyName="delete_import_view.heading" />}>
      <Typography variant="body1" component="p">
        <T keyName="delete_import_view.description" />
      </Typography>

      <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid>
            <FormControl fullWidth sx={{ minWidth: 240 }}>
              <InputLabel id="importTag-label">
                <T keyName="delete_import_view.tag_label" />
              </InputLabel>
              <Select
                labelId="importTag-label"
                id="importTag"
                value={tag}
                label={<T keyName="delete_import_view.tag_label" />}
                onChange={(e) => {
                  const selectedTagName = e.target.value;
                  setTag(selectedTagName);
                  setOutput("");
                  const tagObj = tagList.find((t: any) => t.name === selectedTagName);
                  setTagId(tagObj ? tagObj.id : "");
                }}
              >
                {tagList.map((tagObj: any) => (
                  <MenuItem key={tagObj.id} value={tagObj.name}>
                    {tagObj.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid>
            <Button
              variant="contained"
              color="error"
              startIcon={<DeleteIcon />}
              onClick={handleOpenDeleteDialog}
              disabled={getDeleteCount() === 0 || isLoading || searchLoading}
            >
              <T keyName="delete_import_view.delete_button" />
            </Button>
          </Grid>
        </Grid>

        {(isLoading || tagsLoading || searchLoading) && (
          <Box sx={{ width: "100%", mt: 2 }}>
            <LinearProgress
              variant={isLoading ? "determinate" : "indeterminate"}
              value={progress}
            />
          </Box>
        )}

        {output && <Box mt={2}>{output}</Box>}

        {records.length > 0 && (
          <Box mt={3}>
            <Typography variant="h6" gutterBottom>
              <T keyName="delete_import_view.entries_to_delete" />
              {` (${getDeleteCount()} / ${totalElements})`}
            </Typography>
            <Typography variant="caption" color="text.secondary" display="block" sx={{ mb: 1 }}>
              Alle Einträge mit diesem Tag sind ausgewählt, auch Einträge auf nicht geladenen Seiten.
            </Typography>

            <Box sx={{ height: 400, width: "100%" }}>
              <DataGrid
                rows={records}
                columns={columns}
                initialState={{
                  pagination: {
                    paginationModel: { pageSize: 25, page: 0 },
                  },
                }}
                checkboxSelection
                disableRowSelectionOnClick
                onRowSelectionModelChange={handleRowSelectionModelChange}
                rowSelectionModel={selectedRows}
                paginationModel={paginationModel}
                onPaginationModelChange={handlePaginationModelChange}
                rowCount={totalElements}
                pageSizeOptions={[10, 25, 50, 100]}
                getRowId={(row) => row.id}
                sx={{
                  "& .MuiDataGrid-cell": {
                    padding: "8px 16px",
                  },
                  "& .MuiDataGrid-row:nth-of-type(odd)": {
                    backgroundColor: "rgba(0, 0, 0, 0.04)",
                  },
                }}
              />
            </Box>

          </Box>
        )}
      </Paper>

      {/* Confirmation Dialog */}
      <Dialog
        open={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
      >
        <DialogTitle sx={{ display: "flex", alignItems: "center" }}>
          <WarningIcon color="warning" sx={{ mr: 1 }} />
          <T keyName="delete_import_view.confirm_delete_title" />
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            <T
              keyName="delete_import_view.confirm_delete_message"
              params={{ tag, count: getDeleteCount() }}
            />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsDeleteDialogOpen(false)}>
            <T keyName="delete_import_view.cancel" />
          </Button>
          <Button
            color="error"
            variant="contained"
            onClick={handleDeleteEntries}
            disabled={getDeleteCount() === 0 || isLoading || searchLoading}
          >
            <T keyName="delete_import_view.confirm_delete" />
          </Button>
        </DialogActions>
      </Dialog>
    </View>
  );
}

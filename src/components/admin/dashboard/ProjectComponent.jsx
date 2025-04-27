import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UpdateProjectPopup from "../../utils/UpdateProject";
import {
  Container,
  Grid2,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  CircularProgress,
  Button,
} from "@mui/material";
import {
  fetchProjects,
  getProjects,
  getProjectsLoader,
  getProjectsError,
  deleteProject,
} from "../../../store/projectsSlice";
import ProjectCard from "./ProjectCard";
import NewProjectPopup from "../../utils/NewProjectPopUp";
function AdminProjectsComponent() {
  const dispatch = useDispatch();
  const projects = useSelector(getProjects);
  const loading = useSelector(getProjectsLoader);
  const error = useSelector(getProjectsError);
  const [isNewPopupOpen, setIsNewPopupOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    dispatch(fetchProjects());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(`Failed to fetch projects: ${error}`);
    }
  }, [error]);
  const handleDelete = async (id) => {
    try {
      await dispatch(deleteProject(id)).then((res) => {
        if (res.error) {
          toast.error("Failed to delete Project");
        } else {
          toast.success("Project deleted successfully");
        }
      });
    } catch (error) {
      console.error("Error deleting service:", error);
    }
  };
  return (
    <Box sx={{ backgroundColor: "#111", color: "#fff", py: 6 }}>
      <ToastContainer />
      <Container
        maxWidth="xl"
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          height: `calc(100vh - 170px)`,
        }}
      >
        <Box display={"flex"} flexDirection="column" gap={4}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              gap: "16px",
              marginBottom: "40px",
            }}
          >
            <Typography variant="h3" sx={{ fontWeight: "bold" }}>
              Admin Panel: Projects
            </Typography>
            <Button
              variant="contained"
              onClick={() => setIsNewPopupOpen(true)}
              sx={{
                backgroundColor: "#6A5ACD",
                color: "#fff",
                textTransform: "none",
              }}
            >
              Add New Project
            </Button>
          </Box>
          {loading ? (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
              }}
            >
              <CircularProgress />
            </Box>
          ) : (
            <Grid2 container spacing={4}>
              {projects.map((project) => (
                <ProjectCard
                  key={project.id}
                  item={project}
                  deleteAction={handleDelete}
                  onClick={() => {
                    setSelectedProject(project);
                    setIsNewPopupOpen(true);
                  }}
                />
              ))}
            </Grid2>
          )}
        </Box>
      </Container>
      <NewProjectPopup
        isOpen={isNewPopupOpen}
        onClose={() => setIsNewPopupOpen(false)}
        onSubmit={(formData) => handleSubmit(formData, selectedProject?._id)}
        editingData={selectedProject}
      />
    </Box>
  );
}

export default AdminProjectsComponent;

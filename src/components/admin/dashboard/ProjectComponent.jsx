import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NewProjectPopup from "../../utils/NewProjectPopUp";
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
} from "../../../store/projectsSlice";
import ProjectCard from "./ProjectCard";

function AdminProjectsComponent() {
  const dispatch = useDispatch();
  const projects = useSelector(getProjects);
  const loading = useSelector(getProjectsLoader);
  const error = useSelector(getProjectsError);

  const [isNewPopupOpen, setNewPopupOpen] = useState(false);
  const [isUpdatePopupOpen, setUpdatePopupOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    dispatch(fetchProjects());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(`Failed to fetch projects: ${error}`);
    }
  }, [error]);

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
              onClick={() => setNewPopupOpen(true)}
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
                <ProjectCard key={project.id} item={project} />
              ))}
            </Grid2>
          )}
        </Box>
      </Container>
      <NewProjectPopup
        isOpen={isNewPopupOpen}
        onClose={() => setNewPopupOpen(false)}
        onSubmit={() => {}}
      />
      <UpdateProjectPopup
        isOpen={isUpdatePopupOpen}
        onClose={() => setUpdatePopupOpen(false)}
        onSubmit={() => {}}
        projectData={selectedProject}
        id={selectedId}
      />
    </Box>
  );
}

export default AdminProjectsComponent;

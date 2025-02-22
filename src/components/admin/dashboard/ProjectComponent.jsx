import axios from "axios";
import { useState, useEffect } from "react";
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
  Button,
  IconButton,
} from "@mui/material";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";

function AdminProjectsComponent() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isNewPopupOpen, setNewPopupOpen] = useState(false);
  const [isUpdatePopupOpen, setUpdatePopupOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedId, setSelectedId] = useState(null);
  const [buttonLoading, setButtonLoading] = useState(false);
  const base = import.meta.env.VITE_BASE_URL;
  const url = base + "/api/project/";

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const response = await axios.get(url);
      setProjects(response.data.projects);
    } catch (error) {
      toast.error(`Failed to fetch projects: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ backgroundColor: "#111", color: "#fff", py: 6 }}>
      <ToastContainer />
      <Container maxWidth="xl">
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
          <Typography variant="h6" textAlign="center" color="gray">
            Loading Projects...
          </Typography>
        ) : (
          <Grid2 container spacing={4}>
            {projects.map((project) => (
              <Grid2
                item
                size={{
                  xs: 12,
                  sm: 6,
                  md: 4,
                  lg: 3,
                }}
                key={project._id}
              >
                <Card
                  sx={{
                    borderRadius: 3,
                    border: "1px solid #444",
                    backgroundColor: "#222",
                    color: "#fff",
                    boxShadow: 4,
                    padding: 2,
                  }}
                >
                  {project.image && (
                    <CardMedia
                      component="img"
                      image={project.image}
                      alt={project.name}
                      sx={{
                        width: "100%",
                        height: "200px",
                        objectFit: "cover",
                        borderRadius: "10px",
                      }}
                    />
                  )}
                  <CardContent>
                    <Typography variant="h6" fontWeight="bold">
                      {project.title}
                    </Typography>
                    <Typography variant="body2" color="grey.400">
                      {project.description.length > 50
                        ? `${project.description.substring(0, 50)}...`
                        : project.description}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: "#888", marginTop: 1 }}
                    >
                      Status: {project.status}
                    </Typography>
                    <Typography variant="body2" sx={{ color: "#888" }}>
                      Created at: {new Date(project.startDate).toLocaleString()}
                    </Typography>
                    {project.brochure && (
                      <Typography
                        variant="body2"
                        sx={{ color: "#6A5ACD", cursor: "pointer" }}
                      >
                        <a
                          href={project.brochure}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          View Brochure
                        </a>
                      </Typography>
                    )}
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginTop: 2,
                      }}
                    >
                      <Button
                        variant="contained"
                        sx={{
                          backgroundColor: "#6A5ACD",
                          color: "#fff",
                          textTransform: "none",
                        }}
                        onClick={() => {
                          setSelectedProject(project);
                          setSelectedId(project._id);
                          setUpdatePopupOpen(true);
                        }}
                      >
                        Update
                      </Button>
                      <Button
                        variant="contained"
                        sx={{
                          backgroundColor: "#D32F2F",
                          color: "#fff",
                          textTransform: "none",
                        }}
                      >
                        Delete
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              </Grid2>
            ))}
          </Grid2>
        )}
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

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";
import { Helmet } from "react-helmet";
import { useEffect, useState } from "react";
import LoadingIndicator from "./indicators/LoadingIndicator";

const githubUrl = import.meta.env.VITE_GITHUB_DATA;

const Projects = () => {
  const [githubData, setGithubData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;
  const totalPages = Math.ceil(githubData.length / itemsPerPage);


  const paginateData = (data, itemsPerPage, pageNumber) => {
    const startIndex = (pageNumber - 1) * itemsPerPage;
    const endIndex = pageNumber * itemsPerPage;
    return data.slice(startIndex, endIndex);
  };
  const paginatedData = paginateData(githubData, itemsPerPage, currentPage);
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  useEffect(() => {
    const getGithubData = async () => {
      setLoading(true);
      await fetch(`${githubUrl}/githubdata`)
        .then((response) => response.json())
        .then((data) => {
          setGithubData(data);
          setLoading(false);
          console.log(data[0].description)
        })
        .catch((error) => {
          console.log("Veri yakalama hatası:", error);
          setLoading(false);
        });
    };
    getGithubData();
  }, []);
  useEffect(() => {
    console.log(githubData.length);
  }, [githubData]);
  console.log(githubData.length);
  return (
    <div className="main container mx-auto my-10 px-8 p-8 text-white flex flex-wrap justify-center">
      <Helmet>
        <title>PROJECTS</title>
        <meta name="description" content="HÜSEYİN ÇORAKLI PROJECTS" />
      </Helmet>
      {loading ? (
        <LoadingIndicator />
      ) : (
        <>
    {paginatedData.map((item) => (
      <Card key={item.id} className="w-full mr-4 mb-5" sx={{ maxWidth: 345 }}>
        <CardActionArea>
          <CardContent>
            <Typography gutterBottom variant="h6" component="div">
              {item.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              
              {item.description}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button href={item.html_url} size="small" color="primary">
            Source Code
          </Button>
        </CardActions>
      </Card>
    ))}
    <div className="pagination mt-5">
      {Array.from(Array(totalPages), (item, s) => (
        <button
          key={s}
          onClick={() => handlePageChange(s + 1)}
          className={`px-4 py-2 mx-1 rounded-lg ${currentPage === s + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-600'}`}
        >
          {s + 1}
        </button>
      ))}
    </div>
  </>
      )}
    </div>
  );
};

export default Projects;

import { useDispatch} from "react-redux";
import { Link } from "react-router-dom";
import { Stack, Typography, IconButton, Button } from "@mui/material";
import CircleIcon from "@mui/icons-material/Circle";
import DeleteIcon from "@mui/icons-material/Delete";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
import StarIcon from '@mui/icons-material/Star';


const Project = ({ project ,deleteProject , favoriteProject}) => {

  const { name, color, id ,is_favorite} = project;

  function handleFavorite(){
    const favorite=is_favorite?false:true;
    favoriteProject(id,favorite);
  }

  return (
    <Link to={`/project/${id}`}>
    <Stack
      direction="row"
      sx={{
        width: "100%",
        border: "1px solid grey",
        justifyContent: "space-between",
        boxShadow:'1px 1px 4px grey'
      }}
      id={id}
    >
      <Button startIcon={<CircleIcon sx={{color:color}}/>} sx={{flexGrow:1,justifyContent:'flex-start'}}>{name}</Button>
      <Stack direction="row">
        <IconButton aria-label="favorite" color="warning" onClick={handleFavorite}>
          {is_favorite? <StarIcon /> 
          :<StarOutlineIcon />
          }
        </IconButton>
        <IconButton aria-label="delete" onClick={()=>deleteProject(id)}>
          <DeleteIcon />
        </IconButton>
      </Stack>
    </Stack>
    </Link>
  );
};

export default Project;

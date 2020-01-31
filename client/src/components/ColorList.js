import React, { useState } from "react";
import axios from "axios";
import { axiosWithAuth } from "../utils/axiosWithAuth";

const initialColor = {
  color: "",
  code: { hex: "" }
};

const ColorList = ({ colors, updateColors }, props) => {
  // console.log(colors);
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);

  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };

  const saveEdit = e => {
    e.preventDefault();
    console.log("save New Color", colorToEdit);
    // Make a put request to save your updated color
    // think about where will you get the id from...
    // where is is saved right now?
    axiosWithAuth()
      .put(`/colors/${colorToEdit.id}`, colorToEdit)
      .then(res => {
        axiosWithAuth()
          .get("/colors")
          .then(res => {
            updateColors(res.data);
          })
          .catch(err => {
            console.log(err);
          });
      })
      .catch(err => {
        console.log(err);
      });
  };

  const deleteColor = color => {
    // make a delete request to delete this color
    axiosWithAuth()
      .delete(`/colors/${color.id}`)
      .then(res => {
        axiosWithAuth()
          .get("/colors")
          .then(res => {
            updateColors(res.data);
          })
          .catch(err => {
            console.log(err);
          });
      })
      .catch(err => {
        console.log(err);
      });
  };

  const [newColor, setNewColor] = useState({
    color: "",
    code: {
      hex: ""
    },
    id: Math.random()
  });

  const onSubmitHandler = evt => {
    evt.preventDefault();
    axiosWithAuth()
      .post("/colors", newColor)
      .then(res => {
        axiosWithAuth()
          .get("/colors")
          .then(res => {
            updateColors(res.data);
          })
          .catch(err => {
            console.log(err);
          });
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {colors.map(color => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span
                className="delete"
                onClick={e => {
                  e.stopPropagation();
                  deleteColor(color);
                }}
              >
                x
              </span>{" "}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      {editing && (
        <form onSubmit={saveEdit}>
          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={e => {
                setColorToEdit({ ...colorToEdit, color: e.target.value });
                // console.log("change Color", colorToEdit);
              }}
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value }
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}
      <div className="spacer" />
      {/* stretch - build another form here to add a color */}
      <form onSubmit={onSubmitHandler}>
        <label>Color: </label>
        <input
          type="text"
          name="color"
          value={newColor.color}
          onChange={evt =>
            setNewColor({
              ...newColor,
              color: evt.target.value
            })
          }
        />
        <label>hex: </label>
        <input
          type="text"
          name="hex"
          value={newColor.code.hex}
          onChange={evt =>
            setNewColor({
              ...newColor,
              code: { hex: evt.target.value }
            })
          }
        />
        <button type="submit">Add!</button>
      </form>
    </div>
  );
};

export default ColorList;

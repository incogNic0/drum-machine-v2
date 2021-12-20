import React from "react";
import "../../../assets/styles/PresetsMenu.css";

function PresestsMenu({ kits, currentKit, handlePlayerClick }) {

	return (
		<div className="presets-menu btn">
			<select
				value={currentKit}
				onChange={handlePlayerClick}
				id="kits"
				className="btn"
        name="kit-selector"
      >

				{ kits.map( kit => {
          return <option value={kit.name} key={kit.name}>
            {kit.name}
          </option>
        })}

			</select>
		</div>
	);
}

export default PresestsMenu;

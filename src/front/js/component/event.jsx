import React, { useState } from "react";
import { useTheme } from "@material-ui/core/styles";
import ReactDOM from "react-dom";

import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Avatar from "@material-ui/core/Avatar";
import Chip from "@material-ui/core/Chip";
import Grid from "@material-ui/core/Grid";
import Switch from "@material-ui/core/Switch";
import Select from "@material-ui/core/Select";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Box from "@material-ui/core/Box";
// import DoneIcon from "@material-ui/core/DoneIcon";

import MultipleSelectChips from "@bit/lubuskie.material-ui.multiple-select-chips";

const label = { inputProps: { "aria-label": "Switch demo" } };

const Event = () => {
	const [value, setValue] = useState([]);
	const [error, setError] = useState("");
	const options = [{ label: "Willy", value: 1 }, { label: "Ana", value: 2 }, { label: "Another person", value: 3 }];

	const handleClick = () => {
		console.info("You clicked the Chip.");
	};

	return (
		<div className="appoitment">
			<Avatar
				alt="Remy Sharp"
				src="https://images.pexels.com/photos/2859616/pexels-photo-2859616.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
			/>
			<Typography variant="h6" gutterBottom>
				Create a event
			</Typography>

			<Grid container spacing={2}>
				<Grid item xs={1}>
					<i className="fas fa-calendar-check" />
				</Grid>
				<Grid item xs={11}>
					<TextField
						required
						id="Appoitment"
						name="appoitment"
						label="Appoitment"
						fullWidth
						autoComplete="fname"
					/>
				</Grid>
			</Grid>

			<Grid container spacing={3}>
				<Grid item xs={1}>
					<i className="fas fa-users" />
				</Grid>
				<Grid item xs={5}>
					<TextField
						id="Invite"
						name="invite"
						label="Invite a friend"
						// fullWidth
						// autoComplete="billing address-line2"
					/>
				</Grid>
				<Grid item xs={2}>
					<Chip
						label="Ana"
						onClick={handleClick}
						avatar={
							<Avatar src="https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" />
						}
					/>
				</Grid>
				<Grid item xs={2}>
					<Chip
						label="Willy"
						value={value}
						onClick={handleClick}
						setValue={setValue}
						avatar={
							<Avatar
								alt="Remy Sharp"
								src="https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
							/>
						}
					/>
				</Grid>
			</Grid>

			<Grid container spacing={2}>
				<Grid item xs={1}>
					<i className="far fa-bell" />
				</Grid>
				<Grid item xs={8}>
					<MultipleSelectChips
						// label="Label"
						value={value}
						setValue={setValue}
						options={options}
						error={error}
						setError={setError}
					/>
				</Grid>
			</Grid>

			<Grid container spacing={3}>
				<Grid item xs={1}>
					<i className="far fa-clock" />
				</Grid>
				<Grid item xs={9}>
					<Typography variant="h6" gutterBottom>
						All day
					</Typography>
				</Grid>
				<Grid item xs={2}>
					<Switch {...label} />
				</Grid>
			</Grid>

			<Grid container spacing={3}>
				<Grid item xs={3}>
					<Typography variant="h6" gutterBottom>
						Start
					</Typography>
				</Grid>
				<Grid item xs={7}>
					<Typography variant="h6" gutterBottom>
						wed.,24 nov.
					</Typography>
				</Grid>
				<Grid item xs={1}>
					<Typography variant="h6" gutterBottom>
						14:30
					</Typography>
				</Grid>
			</Grid>

			<Grid container spacing={3}>
				<Grid item xs={3}>
					<Typography variant="h6" gutterBottom>
						End
					</Typography>
				</Grid>
				<Grid item xs={7}>
					<Typography variant="h6" gutterBottom>
						wed.,24 nov.
					</Typography>
				</Grid>
				<Grid item xs={1}>
					<Typography variant="h6" gutterBottom>
						16:30
					</Typography>
				</Grid>
			</Grid>

			<Grid container spacing={3}>
				<Grid item xs={1}>
					<i className="far fa-calendar-alt" />
				</Grid>
				<Grid item xs={6}>
					<TextField
						id="Invite"
						name="invite"
						label="kronara@gmail.com"
						fullWidth
						autoComplete="kronara@gmail.com"
					/>
				</Grid>
			</Grid>

			<Grid item xs={1}>
				<i className="fas fa-users" />
			</Grid>

			<Grid container spacing={3}>
				<Grid item xs={1}>
					<i className="far fa-bell" />
				</Grid>
				<Grid item xs={1}>
					<i className="fas fa-users" />
				</Grid>
				<Grid item xs={1}>
					<i className="fas fa-users" />
				</Grid>
			</Grid>

			<TextField
				id="Invite"
				name="invite"
				label="Invite a friend"
				fullWidth
				autoComplete="billing address-line2"
			/>
			<TextField
				id="Invite"
				name="invite"
				label="Invite a friend"
				fullWidth
				autoComplete="billing address-line2"
			/>
			<TextField
				id="Invite"
				name="invite"
				label="Invite a friend"
				fullWidth
				autoComplete="billing address-line2"
			/>
			<Button variant="contained" color="primary">
				CANCEL
			</Button>
			<Button variant="contained" color="primary">
				SEND
			</Button>
		</div>
	);
};
export default Event;

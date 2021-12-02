import React, { useState } from "react";
import ReactDOM from "react-dom";
import { useForm, Controller } from "react-hook-form";

import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Switch from "@material-ui/core/Switch";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
	container: {
		display: "flex",
		flexWrap: "wrap"
	},
	textField: {
		marginLeft: theme.spacing(1),
		marginRight: theme.spacing(1),
		width: 200
	}
}));

import MultipleSelectChips from "@bit/lubuskie.material-ui.multiple-select-chips";

const label = { inputProps: { "aria-label": "Switch demo" } };

const Event = ({ handleClose }) => {
	const { handleSubmit, register } = useForm();
	const onSubmit = data => console.log(data);

	console.log("aqui esta el register", register);

	const [value, setValue] = useState([]);
	const [error, setError] = useState("");
	const options = [{ label: "Willy", value: 1 }, { label: "Ana", value: 2 }, { label: "Another person", value: 3 }];
	const [selectedDate, handleDateChange] = useState(new Date());
	const [alert, setAlert] = React.useState("");
	const classes = useStyles();
	const handleChange = event => {
		setAlert(event.target.value);
	};

	return (
		<div className="main__appoitment">
			<form onSubmit={handleSubmit(onSubmit)}>
				<div className="event__inputs">
					<h1>Create a event</h1>

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
								{...register("appoitment", { required: true })}
							/>
						</Grid>
					</Grid>

					<Grid container spacing={3}>
						<Grid item xs={1}>
							<i className="fas fa-users" />
						</Grid>
						<Grid item xs={3}>
							<TextField
								id="Invite"
								name="invite"
								label="Invite a friend"
								{...register("Invite")}
								// fullWidth
								// autoComplete="billing address-line2"
							/>
						</Grid>
						<Grid item xs={8}>
							<MultipleSelectChips
								// label="Label"
								src={options.img}
								value={value}
								setValue={setValue}
								options={options}
								error={error}
								setError={setError}
								{...register("options")}
							/>
						</Grid>
					</Grid>

					<Grid container spacing={3}>
						<Grid item xs={1}>
							<i className="far fa-clock" />
						</Grid>
						<Grid item xs={8}>
							<div variant="h6" className="event__switch">
								All day
							</div>
						</Grid>
						<Grid item xs={2}>
							<Switch {...label} />
						</Grid>
					</Grid>

					<Grid container spacing={2}>
						<Grid item xs={6}>
							<div variant="h6" className="event__start__time">
								Start
							</div>
						</Grid>
						<Grid item xs={6}>
							<TextField
								id="datetime-local"
								label="Next appointment"
								type="datetime-local"
								defaultValue="2021-12-24T10:30"
								className={classes.textField}
								InputLabelProps={{
									shrink: true
								}}
							/>
						</Grid>
					</Grid>

					<Grid container spacing={2}>
						<Grid item xs={6}>
							<div variant="h6" className="event__end__time">
								End
							</div>
						</Grid>
						<Grid item xs={6}>
							<TextField
								id="datetime-local"
								label="Next appointment"
								type="datetime-local"
								defaultValue="2021-12-24T10:30"
								className={classes.textField}
								InputLabelProps={{
									shrink: true
								}}
							/>
						</Grid>
					</Grid>

					<Grid container spacing={3}>
						<Grid item xs={1}>
							<i className="far fa-calendar-alt" />
						</Grid>
						<Grid item xs={6}>
							<TextField
								id="Email"
								name="Email"
								label="Email"
								fullWidth
								autoComplete="kronara@gmail.com"
								{...register("Email")}
							/>
						</Grid>
					</Grid>

					<Grid item xs={1} />

					<Grid container spacing={3}>
						<Grid item xs={1}>
							<i className="far fa-bell" />
						</Grid>
						<Grid item xs={4}>
							<FormControl fullWidth>
								<InputLabel id="demo-simple-select-label">Alert</InputLabel>
								<Select
									labelId="demo-simple-select-label"
									id="demo-simple-select"
									value={alert}
									label="Alert"
									onChange={handleChange}>
									<MenuItem value={10}>At time of event</MenuItem>
									<MenuItem value={20}>10 mins before</MenuItem>
									<MenuItem value={30}>30 mins before</MenuItem>
									<MenuItem value={30}>1 hour before</MenuItem>
								</Select>
							</FormControl>
						</Grid>
						<Grid item xs={1} />
					</Grid>

					<Grid container spacing={2}>
						<Grid item xs={1}>
							<i className="fas fa-map-marker-alt" />
						</Grid>
						<Grid item xs={11}>
							<TextField id="Location" name="Location" label="Location" {...register("Location")} />
						</Grid>
					</Grid>

					<Grid container spacing={2}>
						<Grid item xs={1}>
							<i className="far fa-sticky-note" />
						</Grid>
						<Grid item xs={11}>
							<TextField id="Notes" name="Notes" label="Notes" />
						</Grid>
					</Grid>
				</div>
				<div className="event__buttons">
					<Button
						className="event__buttons__cancel"
						variant="contained"
						color="primary"
						onClick={handleClose}
						type="reset">
						CANCEL
					</Button>
					<Button variant="contained" color="primary" type="submit">
						SEND
					</Button>
				</div>
			</form>
		</div>
	);
};
export default Event;

import { useCallback, useState, useRef } from "react";
import "./App.css";

import "survey-core/defaultV2.min.css";
import { Model } from "survey-core";
import { Survey } from "survey-react-ui";
import surveyJson from "./survey.json";
import "./index.css";

// StylesManager.applyTheme("defaultV2");

function App() {
	// useRef enables the Model object to persist between state changes
	const survey = useRef(new Model(surveyJson)).current;
	const [surveyResults, setSurveyResults] = useState("");
	const [isSurveyCompleted, setIsSurveyCompleted] = useState(false);

	const displayResults = useCallback((sender) => {
		setSurveyResults(JSON.stringify(sender.data, null, 4));
		setIsSurveyCompleted(true);
		// send survey results to measure.up.railway.app
		// this is a post request, at path /responses/create
		// with the body of the request being the survey results
	}, []);

	const postResults = useCallback((sender) => {
		// send survey results to measure.up.railway.app
		// this is a post request, at path /responses/create
		// with the body of the request being the survey results
		var myHeaders = new Headers();
		myHeaders.append("Content-Type", "application/json");

		// var raw = JSON.stringify({
		// 	consent_question: "True",
		// 	email_address: "n8sol022@gmail.com",
		// 	room_num: "241",
		// 	fatigue: 3,
		// 	distractions: "True",
		// 	meds: "True",
		// 	subtances: "True",
		// 	discomfort: "True",
		// 	sleep: "False",
		// 	reaction_time_ms: -8,
		// 	visual_mem_level: 12,
		// 	aiming_reaction_ms: 2,
		// 	chimp_score: 12,
		// });
		var raw = JSON.stringify(sender.data);

		var requestOptions = {
			method: "POST",
			headers: myHeaders,
			body: raw,
			redirect: "follow",
		};

		fetch("http://localhost:8000/responses/create", requestOptions) 
			.then((response) => response.text())
			.then((result) => console.log(result))
			.catch((error) => console.log("error", error));
	}, []);

	survey.onComplete.add(displayResults);
	survey.onComplete.add(postResults);

	return (
		<>
			<Survey model={survey} id="surveyContainer" />
			{isSurveyCompleted && (
				<>
					<p>Result JSON:</p>
					<code style={{ whiteSpace: "pre" }}>{surveyResults}</code>
				</>
			)}
		</>
	);
}

export default App;

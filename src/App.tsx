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
	}, []);

	survey.onComplete.add(displayResults);

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

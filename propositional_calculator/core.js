function go() {

	setTimeout( ()=>{

		var input = document.getElementById("expressionInput").value;

		try {

			prettyPrintTruthTable(parse(input));
		}

		catch (e) {

			if (e.description !== undefined) {

				displayCompileError(input, e);
			}

			else {

				throw e;
			}
		}
	}, 500);
}

function assert(expr, what) { // Asserts that the given claim is true, throwing an exception if it isn't.

	if (expr === false) {

		throw new Error("Assertion failed: " + what);
	}
}

function unreachable(why) { // Triggers a failure and reports an error

	throw new Error("Unreachable code: " + why);
}
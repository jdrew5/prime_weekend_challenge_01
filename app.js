// wait for the page to load
$(document).ready(function() {

	// declare variable to track salaries
	var totalMonthlySalary = 0;

	// listen for the submit button
	$("#employeeinfo").submit(function(event) {
		// prevent the submit from entering values into the URL
		event.preventDefault();

		// create object to hold name value pairs
		var values={};

		// load up the values object with names and entered values
		$.each($("#employeeinfo").serializeArray(), function(i,field){
			values[field.name]=field.value;
		});

		// clear out the text fields in the form
		$("#employeeinfo").find("input[type=text]").val("");

		// track the total monthly salary
		totalMonthlySalary += Math.round(parseInt(values.salary)/12);
		
		// append entered values onto the DOM
		appendDOM(values);

		// display the total monthly salary in the form
		$("#employeeinfo").find("#totalmonthlysalary").text("Total Monthly Salary: " + totalMonthlySalary);

		// put the employee monthly salary into the html element using data function
		$("#employeecontainer").children().last().data("monthlySalary", Math.round(parseInt(values.salary)/12));

	});

	// listen for the employee remove button to fire
	$("#employeecontainer").on('click', '.removeButton', function() {

		// pull the salary of the employee from the element
		var minusSalary = $(this).parent().data("monthlySalary");

		// decrease the total salary by the employee's salary
		totalMonthlySalary = totalMonthlySalary - minusSalary;
		
		// write out the updated total monthly salary to the form
		$("#employeeinfo").find("#totalmonthlysalary").text("Total Monthly Salary: " + totalMonthlySalary);

    	// remove the employee from the display
    	$(this).parent().remove();
  });

});

function appendDOM(employee){
	// add the employee div
	$("#employeecontainer").append("<div class='employee'></div>");

	// get the element of the last div
	var $el = $("#employeecontainer").children().last();

	// append object values
	$el.append("<p>First Name: "+employee.firstname+"</p>");
	$el.append("<p>Last Name:"+employee.lastname+"</p>");
	$el.append("<p>ID Number:"+employee.idnumber+"</p>");
	$el.append("<p>Job Title:"+employee.jobtitle+"</p>");
	$el.append("<p>Salary: "+employee.salary+"</p>");

	// add the remove button	
	$el.append("<button class='removeButton'>Remove</button>");

};


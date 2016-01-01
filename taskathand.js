'use strict';
function TaskAtHandApp()
{
    var version = "v1.0";

    function setStatus(message)
    {
        $("#app>footer").text(message);
    }

    function addTask()
    {
        var taskName = $("#new-task-name").val();

        if (taskName) {
            addTaskElement(taskName);
            //Reset the text field.
            $("#new-task-name").val("").focus();
            $("#due-date").val("");
        }
    }

    function addTaskElement(taskName)
    {
        var $task = $('#task-template .task').clone();
        var date = new Date().toLocaleDateString("en-US",
        {
            "year": "numeric",
            "month": "numeric"
        });
        var $dueDate = $("#due-date").val();
        $("span.date", $task).text(date);
        $("span.task-name", $task).text("-->> " + taskName);
        $("span.due-date", $task).text("-->> " + $dueDate);

        $("#task-list").append($task);

        $("button.delete", $task).click(function() {
            $task.remove();
        });
        $("button.move-up", $task).click(function()
        {
            $task.insertBefore($task.prev());
        });
        $("button.move-down", $task).click(function()
        {
            $task.insertAfter($task.next());
        });
        $("span.task-name", $task).click(function() {
            onEditTaskName($(this));
        });
        $("input.task-name", $task).change(function()
        {
            onChangeTaskName($(this));
        });

        function onEditTaskName($span)
        {
            $span.hide()
                .siblings("input.task-name")
                .val($span.text())
                .show()
                .focus();
        }

        function onChangeTaskName($input)
        {
            $input.hide();
            var $span = $input.siblings("span.task-name");
            if ($input.val())
            {
                $span.text($input.val());
            }
            $span.show();
        }

    }
    this.start = function() {
        $("#due-date").keypress(function(e)
            {
                if (e.which == 13) // Enter key
                {
                    addTask();
                    return false;
                }
            })
            .focus();

        $("#app>header").append(version);
        setStatus("ready");
    };
}
$(function()
{

    window.app = new TaskAtHandApp();
    window.app.start();
});
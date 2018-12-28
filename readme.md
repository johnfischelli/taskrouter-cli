Twilio Taskrouter CLI (Experimental)
===
A command line interface for managing Twilio TaskRouter Instances.

After installing you'll be able to:

* Create Workspaces
* Display workspaces and select one to perform actions
* Create/Delete Workers

## Usage

```
Usage: index [options] [command]

Options:
  -V, --version                 output the version number
  -h, --help                    output usage information

Commands:
  selectWorkspace|sws                 Lists workspaces and allows you to specify which workspace to select for other commands to be run against.
  displaySelectedWorkspace|dws        Tells you which workspace is currently selected for commands to be run against.
  createWorkspace|cws [name]          Creates a Workspace (assumes default profile)

  listActivities|la                   List Activities (assumes default profile, and selected workspace)
  createActivity|ca [options] [name]  Creates a Activity (assumes default profile, and selected workspace)
  deleteActivity|da [name]            Deletes a Activity by friendly name (assumes default profile, and selected workspace)

  listQueues|lq                       List Queues (assumes default profile, and selected workspace)
  createQueue|cq [options] [name]     Creates a Queue (assumes default profile, and selected workspace)
  deleteQueue|dq [name]               Deletes a Queue by friendly name (assumes default profile, and selected workspace)

  listWorkers|lw                      List Workers (assumes default profile, and selected workspace)
  createWorker|cw [name]              Creates a Worker (assumes default profile, and selected workspace)
  deleteWorker|dw [name]              Deletes a Worker by friendly name (assumes default profile, and selected workspace)

  export                              Export an entire Workspace and all sub-resources
```

## Configuration
Compatible with configuration profiles set by [Autopilot CLI](https://github.com/twilio/autopilot-cli)
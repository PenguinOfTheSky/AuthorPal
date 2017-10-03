# Contributor's Guide

We welcome pull requests from follow developers!
Follow these steps to contribute:

1. Find an issue.

2. Let us know you are working on it by posting a comment on the issue.

3. Read all the guidelines in this document before you start working on the issue.

If you find a bug that is not listed as an issue, feel free to add a new issue.

---

## Contribution Guidelines
- [Code Style](#code-style)
- [Forking the Project](#forking-the-project)
- [Create a Branch](#create-a-branch)
- [Make Changes](#make-changes)
- [Creating a Pull Request](#creating-a-pull-request)
- [Submitting a Pull Request](#submitting-a-pull-request)
- [Next Steps](#next-steps)

### Code Style
Indentation is of paramount importance.
Are you having trouble parsing the file to edit?
Try Atom's fold-navigator by turgeza.

### Forking the Project

1. Go to the top level AuthorPal repository page on github: [https://github.com/PenguinOfTheSky/AuthorPal](https://github.com/PenguinOfTheSky/AuthorPal)
2. Click the "Fork" Button in the upper right hand corner of the interface ([More Details Here](https://help.github.com/articles/fork-a-repo/))
3. After the repository has been forked, you will be taken to your copy of the AuthorPal at `yourUsername/AuthorPal`

#### Cloning Your Fork

1. Open a Terminal / Command Line / Bash Shell
2. Clone your fork of AuthorPal

```shell
git clone https://github.com/yourUsername/AuthorPal.git
```

##### (make sure to replace `yourUsername` with your GitHub Username)

This will create a directory `AuthorPal` and download the entire AuthorPal repo to it.

#### Setup Your Upstream

1. Navigate to the new AuthorPal directory (`cd AuthorPal`)
2. Use the git command to add a remote to the original AuthorPal repo:

```shell
git remote add upstream https://github.com/PenguinOfTheSky/AuthorPal.git
```

Congratulations, you now have a local copy of the AuthorPal repo!

#### Maintaining Your Fork

Now that you have a copy of your fork, there is work you will need to do to keep it current.

##### **Rebasing from Upstream**

Do this prior to every time you create a branch for a pull request:

1. Make sure you are on the `master` branch

  > ```shell
  > $ git status
  > On branch master
  > Your branch is up-to-date with 'origin/master'.
  > ```

  > If your aren't on `master`, resolve outstanding files / commits and checkout the `master` branch

  > ```shell
  > $ git checkout master
  > ```

2. Do a pull with rebase against `upstream`

  > ```shell
  > $ git pull --rebase upstream master
  > ```

  > This will pull down all of the changes to the original master branch, without making an additional commit in your local repo.

3. (_Optional_) Force push your updated master branch to your GitHub fork

  > ```shell
  > $ git push origin master --force
  > ```

  > This will overwrite the master branch of your fork.

### Setup AuthorPal

Please follow the steps in the [README.md](README.md) document.

### Create a Branch

Before you start working, you will need to create a separate git branch specific to the issue / feature you're working on. You will push your work to this branch. Do not work off the master branch.

#### Naming Your Branch

Name the branch something like `fix/xxx` or `feature/xxx` where `xxx` is a short description of the changes or feature you are attempting to add. For example `fix/focusButton` would be a branch where you fix something specific to the focus button.

#### Adding Your Branch

To create a git branch on your local machine (and switch to this branch):

```shell
$ git checkout -b [name_of_your_new_branch]
```

and to push to GitHub:

```shell
$ git push origin [name_of_your_new_branch]
```

##### If you need more help with branching, take a look at [this](https://github.com/Kunena/Kunena-Forum/wiki/Create-a-new-branch-with-git-and-manage-branches).

### Make Changes
This bit is up to you!

### Creating a Pull Request

#### What is a Pull Request?

A pull request (PR) is a method of submitting proposed changes to a GitHub repository. You will make changes to copies of the files which make up AuthorPal in a personal fork, then apply to have them accepted by AuthorPal proper.

#### Important: ALWAYS EDIT ON A BRANCH

Take away only one thing from this document, it should be this: Never, **EVER**
make edits to the `master` branch. ALWAYS make a new branch BEFORE you edit
files. This is critical, because if your PR is not accepted, your copy of
master will be forever sullied and the only way to fix it is to delete your
fork and re-fork.

1.  Perform the maintenance step of rebasing `master`.
2.  Ensure you are on the `master` branch using `git status`:

```bash
$ git status
On branch master
Your branch is up-to-date with 'origin/master'.

nothing to commit, working directory clean
```

1.  If you are not on master or your working directory is not clean, resolve
    any outstanding files/commits and checkout staging `git checkout master`

2.  Create a branch off of `master` with git: `git checkout -B
    branch/name-here` **Note:** Branch naming is important. Use a name like
    `fix/short-fix-description` or `feature/short-feature-description`.

3.  Edit your file(s) locally with the editor of your choice

4.  Check your `git status` to see unstaged files.

5.  Add your edited files: `git add path/to/filename.ext` You can also do: `git
    add .` to add all unstaged files. Take care, though, because you can
    accidentally add files you don't want added. Review your `git status` first.

6.  Commit your edits: `git commit -m "Brief Description of Commit"`. Do not add the issue number in the commit message.

7.  Preferably squash your commits, if there are more than one.

8.  Push your commits to your GitHub Fork: `git push -u origin your-branch-name`

9.  Submit a Pull Request

### Submitting a Pull Request

1.  Once the edits have been committed, you will be prompted to create a pull
    request on your fork's GitHub Page.

2.  Submit a pull request from your branch to AuthorPal `master` branch.

3.  The title (also called the subject) of your PR should be descriptive of your
    changes and succinctly indicates what is being fixed.

    -   **Do not add the issue number in the PR title or commit message.**

    -   Examples: `Add Contribution text` `Correct typo in Contribution.md`

4.  In the body of your PR include a more detailed summary of the changes you
    made and why.

    -   If the PR is meant to fix an existing bug/issue, then, at the end of
        your PR's description, append the keyword `closes` and #xxxx (where xxxx
        is the issue number). Example: `closes #1337`. This tells GitHub to
        close the existing issue, if the PR is merged.

### Next Steps

#### If your PR is accepted

Once your PR is accepted, you may delete the branch you created to submit it.
This keeps your working fork clean.

You can do this with a press of a button on the GitHub PR interface. You can
delete the local copy of the branch with: `git branch -D branch/to-delete-name`

#### If your PR is rejected

Don't despair! You should receive solid feedback from the moderators as to
why it was rejected and what changes are needed.

Many Pull Requests, especially first Pull Requests, require correction or
updating. If you have used the GitHub interface to create your PR, you will need
to close your PR, create a new branch, and re-submit.

If you have a local copy of the repo, you can make the requested changes and
amend your commit with: `git commit --amend` This will update your existing
commit. When you push it to your fork you will need to do a force push to
overwrite your old commit: `git push --force`

Be sure to post in the PR conversation that you have made the requested changes.

# Intro to Git & GitHub

- [Why](#orgff7a179)
- [Before We Start](#org67c1b09)
  - [macOS](#orga1cca0c)
  - [Linux](#orgb96fc78)
  - [Windows](#org1da6ef1)
- [About Git](#orgf41e84c)
- [Basics](#orga30cdf9)
  - [Identifying yourself](#orgd70d77d)
  - [Getting code](#org73f79de)
  - [Exploring repository](#orgcbf40e5)
    - [Master branch](#orgd8c027a)
    - [origin/master](#org8885012)
    - [Nothing to commit](#org3b47ed4)
  - [Committing](#org151b177)
- [Sending your changes to remote repository](#org3406d1f)
- [Getting serious](#orge5df519)
  - [Merging & Rebasing](#org66489b1)
  - [Conflicts](#org53c4a84)
  - [Stashing](#org9ec73bb)
  - [Branching](#orga199d89)
- [What's Next?](#org72237cc)

This tutorial expects some command line skills.


<a id="orgff7a179"></a>

# Why

Git (and GitHub) is used at Wix to store code, track its changes, and build deployable from. Feeling comfortable using Git is important to be an effective and efficient team member. In this tutorial, you will learn how to download remote code, change it, and share those changes. Then we will look at merging, rebasing, merge conflicts, stashing, branching, and pull requests.

If you are already familiar with these topics, feel free to skip this tutorial.


<a id="org67c1b09"></a>

# Before We Start

Make sure you have Git installed on your machine.


<a id="orga1cca0c"></a>

## macOS

If you have XCode, Git is already there. Let's check it by executing this in Terminal:

```sh
$ git --version
```

    git version 2.15.1 (Apple Git-101)

If it is missing, running `git` in Terminal should show installation dialog. Otherwise, run

```sh
$ xcode-select --install
```

Now you can choose to install command line tools or get whole of XCode. Only command line tools are required, so you can skip XCode for now. It takes a lot longer to install.


<a id="orgb96fc78"></a>

## Linux

You are working with Linux, good for you. This most likely means that you know what you are doing and can figure out how to install Git on your own.


<a id="org1da6ef1"></a>

## Windows

Uff&#x2026; Just use Linux subsystem and see section on Linux.


<a id="orgf41e84c"></a>

# About Git

Git is decentralized version control system. Decentralization means that no repository is playing main role. The concept of main repository only emerges as a consequence of your company's structure or some preexisting conventions. For example, here at Wix, repositories on GitHub could be seen as main, because:

-   everybody's changes end up there,
-   they get collected by Continuous Integration servers from GitHub,
-   and CI builds those changes to create deployable artifacts.

There is no reason why repository residing on your machine could not be used for the steps above. After all, your copy of the repository is as complete as the rest.

Now, let's get our hands dirty.


<a id="orga30cdf9"></a>

# Basics


<a id="orgd70d77d"></a>

## Identifying yourself

Because of decentralization, there is no requirement to identify yourself. All changes can be anonymous as they reside in your copy of repository. But once you need to move your work from your machine to GitHub authorization is mandatory. Before we talk about that, it is also important to be nice citizen and configure Git to put your name and email in every commit.

To set name and email for all your `git` work do

```sh
$ git config --global user.name "Your Name"
$ git config --global user.email "youremail@wix.com"
```

Changing name and email per repository is possible. Skip `--global` for that.


<a id="org73f79de"></a>

## Getting code

Getting public code requires no authorization. Fetch example repository with this command

```sh
$ git clone https://github.com/donataswix/mobile-onboarding-example
```

You have a `mobile-onboarding-example` directory now, let's visit it.

```sh
$ cd mobile-onboarding-example
```


<a id="orgcbf40e5"></a>

## Exploring repository

First, let's see what do we have in this repo.

```sh
$ ls
```

    README.md

Nice. What does Git know about current status of the repository?

```sh
$ git status
```

    On branch master
    Your branch is up to date with 'origin/master'.
    
    nothing to commit, working tree clean

Whoa! So many interesting words. Let's go through them.


<a id="orgd8c027a"></a>

### Master branch

Branch? If it helps, Git's history forms a Directed Acyclic Graph. The keyword here is "Graph". It means that there can be multiple edges from a single node. Squinting at it from the right angle one can see a branch forming! The branch does not mean a point to which edges are connected, which is a bit confusing. Git branch is just a pointer to a particular record in history. When a new change is recorded on a branch, branch pointer is changed to refer to this latest record.

Master is just a name of default branch.

Here record #2 is branching into two histories. One branch is called MASTER, the other &#x2013; FEATURE-A.

```artist
+---------+     +---------+      +---------+
| +Hello  |     | -Hello  |      | -Hello! |
|         |<----+ +Hello! |<-----+ -Hello? |<--- MASTER
| #1      |     | #2      |      | #3      |
+---------+     +---------+      +---------+
                     ^
                     |
                +----+----+
                | -Hello! |
                | +Hi!    |<----- FEATURE-A
                | #4      |
                +---------+
```

New record on MASTER branch is pointed to automatically:

```artist
+---------+     +---------+      +---------+     +---------+
| +Hello  |     | -Hello  |      | -Hello! |     |  Hello? |
|         |<----+ +Hello! |<-----+ +Hello? |<----+ +Hello! |
|         |     |         |      |         |     |         |
+---------+     +---------+      +---------+     +---------+
                     ^                                ^
                     |                                |
                +----+----+                           |
                | -Hello! |                           |
                | +Hi!    |<----- FEATURE-A        MASTER
                |         |
                +---------+
```


<a id="org8885012"></a>

### origin/master

Git knows about remote repositories. This is a name of it. Let's see what's behind it.

```sh
$ git remote get-url origin
```

    https://github.com/donataswix/mobile-onboarding-example


<a id="org3b47ed4"></a>

### Nothing to commit

Commit means a particular record of changes in history. To commit is to record changes.

Git can identify new or changed files in the working directory tree. Let's add a new file and see what Git thinks of it.

```sh
$ touch TODO.md
$ git status
```

    On branch master
    Your branch is up to date with 'origin/master'.
    
    Untracked files:
      (use "git add <file>..." to include in what will be committed)
    
    	TODO.md
    
    nothing added to commit but untracked files present (use "git add" to track)

Alright. It noticed our new file and suggested to start tracking it with `git add`. Now, let's shift up a gear and go faster. On to the next section!


<a id="org151b177"></a>

## Committing

Following Git's advice we run

```sh
$ git add TODO.md
```

What is the status now?

```sh
$ git status --short # or -s
```

`TODO.md` is recognized as new file to be committed. Let's do that!

```sh
$ git commit -m "Adding TODO file."
```

Good commit description is very important. Depending on your team size and projects you work on, there will be few to dozens to hundreds of updates to go through every day. Short and descriptive commit messages allows to quickly scan the log. So let's look at it now.

```sh
$ git log
```

    commit 186b81816a1a929f1bc2e61e4805bf431c33967d
    Author: Karolis Butkus <karolisb@wix.com>
    Date:   Tue Nov 27 13:02:42 2018 +0200
    
        Make it exciting.
    
    commit 2f0c426d771e6563af43d7f84b5d608fc097952f
    Author: Donatas Petrauskas <donatas.petr@gmail.com>
    Date:   Tue Nov 27 13:00:45 2018 +0200
    
        Address "World".
    
    commit 7587f907216d214c987908969713d6b3497d1503
    Author: Donatas Petrauskas <donatasp@wix.com>
    Date:   Tue Nov 27 12:59:17 2018 +0200
    
        Add README.md

Not bad.

You do not have write permissions to send your updates to this repository. You are going to create your own soon to do just that. But before we go, let's see a magic trick!

```sh
$ git reset --hard HEAD^
```

Behold! We just went back in time. Those funny words are definitely some sort of spell. Don't worry. We are going to dispel all the magic.

-   HEAD is a reference to latest commit of the currently selected branch. A caret at the end (^) is a special syntax for pointing to previous commits. HEAD^ points to second to last. HEAD^^ – third to last. There is also ~ (tilde) variant. HEAD~3 is the same as HEAD^^^.
-   `--hard` flag tells Git to discard all changes between HEAD and the commit we are resetting to. Be careful, this is a destructive action.

If you skip `--hard`, changes stay in the directory tree. This is useful for regrouping changes into a different set of commits. Changing history is very dangerous as many science fiction stories warn us. The two repositories that shared the same history become incompatible and sending code from one to another will be a tedious affair.


<a id="org3406d1f"></a>

# Sending your changes to remote repository

Head to GitHub and create a new repository there. When creating an empty repository, you will get the instructions to follow. Pick a first set and create the new repository on your machine. All instructions will be familiar, except the last one.

```sh
$ git push -u origin master
```

Git refers to sending code as pushing. If you recall, we used `git clone` when downloading a repository. But what about fetching updates later on? There's `git pull` for that. Push and pull. A nice pair of commands you are going to use a lot!

`-u` flag is shorthand for `--set-upstream`. This means that above push command will mark remote origin as upstream. Subsequent `push` and `pull` operations will automatically connect to `origin`.

Exercise time! Using commands you already know, create a new file and push it to `origin`. See your changes appear on GitHub.


<a id="orge5df519"></a>

# Getting serious

Hopefully, up until now, everything went smoothly. However, this is not what happens in Real Life™. Reality is complicated. There are choices to make and conflicts to resolve.


<a id="org66489b1"></a>

## Merging & Rebasing

You have already encountered `git push`. Hopefully, you haven't seen this message yet:

    To /Users/donatasp/projects/onboarding/copy2/../origin
     ! [rejected]        master -> master (fetch first)
    error: failed to push some refs to '/Users/donatasp/projects/onboarding/copy2/../origin'
    hint: Updates were rejected because the remote contains work that you do
    hint: not have locally. This is usually caused by another repository pushing
    hint: to the same ref. You may want to first integrate the remote changes
    hint: (e.g., 'git pull ...') before pushing again.
    hint: See the 'Note about fast-forwards' in 'git push --help' for details.

Don't mind the paths that are present on my machine. This is generic message meaning that your local history is different from remote. You are correctly pointed to try `git pull`. But what will happen if you do? First, Git will fetch new changes, then, by default, it will create new commit pointing to both latest changes on your copy and on remote. This new commit is called merge commit.

Visualisation of merge commit:

```artist
+-----+     +-----+     +-----+     +--------+
| #1  |<----+ #2  |<----+ #4  |<----+ Merge  |
|     |     |     |     |     |     | Commit |
+-----+     +-----+     +-----+     +--------+
                ^                   |
                |                   v
                +------+     +------+
                | #3   |<----+ #5   |
                |      |     |      |
                +------+     +------+
```

Merge is not the only option. There is also rebase. To use rebase instead of merge, pass `-r` to `pull`

```sh
$ git pull -r
```

History after rebase instead of merge:

```artist
+-----+     +-----+     +-----+     +------+     +------+
| #1  |<----+ #2  |<----+ #4  |<----+ #3   |<----+ #5   |
|     |     |     |     |     |     |      |     |      |
+-----+     +-----+     +-----+     +------+     +------+
```

Rebase will rewrite your commits and apply them on top of freshly pulled changes. Pushing will succeed now. Unless somebody else pushed in the meantime!

    $ git push
    Counting objects: 6, done.
    Delta compression using up to 8 threads.
    Compressing objects: 100% (2/2), done.
    Writing objects: 100% (6/6), 566 bytes | 566.00 KiB/s, done.
    Total 6 (delta 0), reused 0 (delta 0)
    To /Users/donatasp/projects/onboarding/copy2/../origin
       871da5f..1e86e17  master -> master

Most of the teams at Wix have settled on rebase. Linear history is a lot easier to deal with. This is what I recommend too, but it's your and your team's choice.


<a id="org53c4a84"></a>

## Conflicts

When I described `git pull` in the previous section, I skipped a significant step. What happens if remote and local changes affect the same place? There will be a merge conflict unless Git manages to reconcile differences. From time to time, file merging algorithms will bail out and leave you to deal with a mess.

    $ git pull -r
    From /Users/donatasp/projects/onboarding/copy2/../origin
     + 1e86e17...871da5f master     -> origin/master  (forced update)
    First, rewinding head to replay your work on top of it...
    Applying: Address world.
    Using index info to reconstruct a base tree...
    M	README
    Falling back to patching base and 3-way merge...
    Auto-merging README
    CONFLICT (content): Merge conflict in README
    error: Failed to merge in the changes.
    Patch failed at 0001 Address world.
    The copy of the patch that failed is found in: .git/rebase-apply/patch
    
    Resolve all conflicts manually, mark them as resolved with
    "git add/rm <conflicted_files>", then run "git rebase --continue".
    You can instead skip this commit: run "git rebase --skip".
    To abort and get back to the state before "git rebase", run "git rebase --abort".

This basically says that Git tried really hard, but README from divergent histories cannot be reconciled into one. Time to pick up your scalpel, doctor, and dive in. Peek inside README file.

```text
<<<<<<< HEAD
HELLO WORLD!
=======
HELLO WORLD
>>>>>>> Address world.
```

Beginning and end of conflict zone are marked by angle brackets. Equality signs indicate where one version of history stops and another begins. In this case, the last commit contains "HELLO WORLD!" and one that cannot be merged is "HELLO WORLD". The main task is to choose which one is correct. But sometimes it's more complicated than picking a side. Changes in other places that did not produce merge conflict might have invalidated both versions. In that case, a rewrite is necessary.

When done, run `git rebase --continue`. Both histories are aligned now, time for push!

    $ git push
    Counting objects: 3, done.
    Writing objects: 100% (3/3), 266 bytes | 266.00 KiB/s, done.
    Total 3 (delta 0), reused 0 (delta 0)
    To /Users/donatasp/projects/onboarding/copy2/../origin
       871da5f..9640230  master -> master

After a few resolved conflicts you will gain an appreciation for small focused commits. Don't start renaming variables throughout the files if the task is to change background colors.


<a id="org9ec73bb"></a>

## Stashing

Say you are working on some piece of code. It has been a few hours and it looks nothing like what you started with. In the middle of the change you notice an urgent JIRA ticket that calls for a global change of the border color. "Easy!" you proclaim and proceed to changing it in the code, but… The code is not there. It's moved! In fact, you moved it. “Wait… Should I commit this big change first? If I have not started&#x2026; On master it would be just one line of code.” In the back of your head there is a nagging feeling that you are already familiar with this situation. "Haven't I read about it in onboarding tutorial?" you ask yourself. Yes you did, in this very section. You can use stash to temporarily store you uncommitted changes and clear the working history. This will let you make the change to master, commit it, and get back to your unfinished code by popping the stashed draft.

Determined, you launch your favourite terminal and type:

```sh
$ git stash -a
```

All changes are stored in a safe place now. Master is clean. You apply the small change of the border color, commit, push, and in no time the correct color is in production. Well done!

Let’s see where your unfinished code is.

    $ git stash list
    stash@{0}: WIP on master: 9640230 Address world.

Let's pop it back to the working directory.

    $ git stash pop
    Already up to date!
    On branch master
    Your branch is up to date with 'origin/master'.
    
    Untracked files:
      (use "git add <file>..." to include in what will be committed)
    
    	NiceComponent.js
    
    nothing added to commit but untracked files present (use "git add" to track)
    Dropped refs/stash@{0} (4028ddd6fa0df4dfe8693093f5c52d8a6933e4fa)


<a id="orga199d89"></a>

## Branching

Adding your changes on top of the master branch is a recommended way at Wix. Continuous delivery, feature toggles, and software testing practices voids the appeal of splitting the development into separate feature branches. We choose quick iterations over big changes and monstrous releases.

However, it is totally ok to branch off the master to create a pull request and ask for a code review. For some repositories, write permissions are restricted to the team members only, so a pull request is the way to go.

If you don't have access to the repository, start by forking it on GitHub. If you do have access, you can work with the original repository. Clone the respective repo to your local machine using

    git clone <repoURL>

and create a new branch for your changes:

```sh
$ git checkout -b awesome-new-feature master
```

Yeah, I know. Why should I use `checkout` to create a branch? Naming things is tough. Luckily, at this point, you can focus on writing your code.

When you are done, it's time to send the code back to your fork or original repo on GitHub.

```sh
$ git push -u origin awesome-new-feature master
```

Do you remember what `-u` means? Spoiler: it's an alias for `--set-upstream`.

Now, if you visit the original project on GitHub, it will offer you to create a pull request. Just follow GitHub's lead and you will be done in no time. Congratulations! Your code is ready for review. Let's hope nobody will find any issues.


<a id="org72237cc"></a>

# What's Next?

Believe it or not, but there is more to know about Git. If you get stuck, don't hesitate to ask for help. Your colleagues will be glad to be of a service. If you want to be a fun egghead at parties, there is a great deal of tricks and interesting facts at <https://git-scm.com/doc>.

Hope you enjoyed it!

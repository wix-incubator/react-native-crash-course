# Intro to Git & GitHub

> :point_right: Suggestion - consider replacing this whole section with links to great tutorials on using Git and GitHub out there. Since there is so much great content already written on the topic... Also, just a side note - I believe for devs applying to work at Wix one of the requirements is to provide a link to their GutHub profile, correct? Which makes this section look strange (I know we are open-sourcing this but we are mentioning this was originally created for onboarding devs at Wix).

- [Why](#orgff7a179)
- [Before We Start](#org67c1b09)
  - [macOS](#orga1cca0c)
  - [Linux](#orgb96fc78)
  - [Windows](#org1da6ef1)
- [About Git](#orgf41e84c)
- [Basics](#orga30cdf9)
  - [Identifying yourself](#orgd70d77d)
  - [Fetching code](#org73f79de)
  - [Exploring a repository](#orgcbf40e5)
    - [Master branch](#orgd8c027a)
    - [origin/master](#org8885012)
    - [nothing to commit](#org3b47ed4)
  - [Committing](#org151b177)
- [Sending your changes to the remote repository](#org3406d1f)
- [Getting serious](#orge5df519)
  - [Merging & Rebasing](#org66489b1)
  - [Conflicts](#org53c4a84)
  - [Stashing](#org9ec73bb)
  - [Branching](#orga199d89)
- [What's Next?](#org72237cc)

**This tutorial expects some command line knowledge.**


<a id="orgff7a179"></a>

# Why

At Wix we use Git (and GitHub) to store code, track changes, and build deployable products. Making sure you are comfortable with Git is important, as it is one of the core skills of an  effective and efficient team member.

In this tutorial, you will learn how to download remote code, change it, and share your changes. Then we will look at merging, rebasing, merge conflicts, stashing, branching, and pull requests.

If you are already familiar with these topics, feel free to skip this tutorial.


<a id="org67c1b09"></a>

# Before We Start

Make sure you have Git installed on your machine.


<a id="orga1cca0c"></a>

## macOS

If you have XCode, Git is already there. Let's check it by executing this in Terminal:

```sh
$ git --version
git version 2.15.1 (Apple Git-101)
```

If it's missing, running `git` in Terminal should show and installation dialog. Otherwise, run

```sh
$ xcode-select --install
```

At this point you can choose to install just the command line tools or get the whole of XCode. Only command line tools are required, so you can skip complete XCode installation for now. It takes a lot longer to install.


<a id="orgb96fc78"></a>

## Linux

In Debian-based distros (Ubuntu, Lunux Mint, ArchLinux, etc), run

```sh
$ sudo apt install git
```

Then run to test:

```sh
$ git --version
git version 2.21.0
```

If you are running something less widespread and, potentially, RPM-based (like Fedora or, maybe, openSUSE) just search for installation instructions online.


<a id="org1da6ef1"></a>

## Windows

If you really need to use Windows, check out [gitforwindows.org](https://gitforwindows.org/), it should get you up to speed with everything you need.

> Generally speaking Windows is usually not the ideal environment for native development and so this tutorial won't cover many of the issues you might face in settings things up and running apps.


<a id="orgf41e84c"></a>

# About Git

Git is a decentralized version control system. Decentralization means that no repository is more important that any other. The concept of a main repository only emerges as a consequence of your company's structure or some preexisting conventions. For example, here at Wix, repositories on GitHub could be seen as main (or more important), because:

-   everybody's changes end up there
-   they are processed by Continuous Integration servers from GitHub
-   CI builds those changes to create deployable artifacts

> :point_right: So we assume here that people have no idea what Git is, but we are completely fine is mentioning CI servers and CI builds without mentioning at all what those are or what they do. It's just that I personally can't see how a CI server can exist without Git (or something like mercurial for that matter). Maybe at least link to some wiki page on CI concepts or suggest some further reading?

Your repository, residing on your local machine can also be a part of the steps above. After all, your copy of the repo is as complete as the rest.

Now, let's get our hands dirty.


<a id="orga30cdf9"></a>

# Basics

<a id="orgd70d77d"></a>

## Identifying yourself

Because of decentralization, there is no requirement to identify yourself. All changes can be anonymous as they reside in your copy of repository. But once you need to move your work from your machine to GitHub authorization is mandatory. Let's configure Git to attach your name and email to every commit.

To set your name and email for all your `git` work do:

```sh
$ git config --global user.name "Your Name"
$ git config --global user.email "youremail@wix.com"
```

Changing name and email per repository is possible. Skip `--global` for that.

<a id="org73f79de"></a>

## Fetching code

Copying a public repository requires no authorization. For demo purposes, let's fetch an example repository with this command:

```sh
$ git clone https://github.com/donataswix/mobile-onboarding-example
```

This should have created a `mobile-onboarding-example` directory inside the directory where you ran the previous command. Let's look inside it:

```sh
$ cd mobile-onboarding-example
```

<a id="orgcbf40e5"></a>

## Exploring a repository

First, let's see what we have in this repo.

```sh
$ ls
README.md
```

This example one only has one file, the `README.md`, which is something you will see in a lot of repos out there, public or private. It is always a good idea to have a readme file inside your repo. In fact, starting things off with a `README.md` (even if an empty one), before writing any code, is generally a good idea.

Now, what does Git know about current status of this repository?

```sh
$ git status
On branch master
Your branch is up to date with 'origin/master'.

nothing to commit, working tree clean
```

Whoa! Quite some terms here. Let's go through those.


<a id="orgd8c027a"></a>

### Master branch

A branch? Technically speaking, Git's history forms a Directed Acyclic Graph. The keyword here is "Graph". It means that there can be multiple edges, "branching" off any single node. Once there are multiple branches and one "trunk", it all does look like tree branches (or a root system if you prefer to look at it that way).

Despite the above analogy being quite helpful in visualizing the basics of Git logic, the reference can only take us this far. For instance, a branch does not mean a point at which edges are connected, which is a bit confusing. Git branch is just a pointer to a particular record in history. When a new change is recorded on a branch, branch pointer is changed to refer to this latest record.

"Master" in this example is just a name the branch - in fact, it's the default name Git gives it, once a repository is created.

Here record #2 is branching into two histories. One branch is called MASTER, the other &#x2013; NEW FEATURE. Naming is completely arbitrary and you can name branches whatever you want, as long as it makes sense to you and your teammates.

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
                | +Hi!    |<----- NEW FEATURE
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
                | +Hi!    |<----- NEW FEATURE        MASTER
                |         |
                +---------+
```

<a id="org8885012"></a>

### origin/master

Git knows about remote repositories, too. Title of this section, *origin/master*, is it's name. Let's see what's behind it.

```sh
$ git remote get-url origin
```

    https://github.com/donataswix/mobile-onboarding-example


<a id="org3b47ed4"></a>

### nothing to commit

Commit means a particular record of change(s) in Git history. To commit is to record any changes, mentioning who made them.

Git takes care of identifying new or changed files in the working directory tree. Let's add a new file and see what Git thinks of it.

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

`TODO.md` is recognized as a new file to be committed. Let's do just that!

```sh
$ git commit -m "Adding TODO file."
```

Good commit description is very important. Depending on your team size and projects you work on, there will be anywhere from just a few to dozens, maybe hundreds of updates to go through every day. Short and descriptive commit messages allows others to look through the log quickly. So let's look at it now.

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

Not bad. Above we can see 3 "chunks", representing 3 latest commits. For each one Git shows you the unique ID of the commit, it's author and date, and the commit message.

You do not have write permissions to send your updates to this repository. You are going to create your own soon to do just that. But before we move on, let's see some magic!

```sh
$ git reset --hard HEAD^
```
    HEAD is now at 2f0c426 Address "World".

Now if we run

```sh
$ git log
```

we will get:

```
commit 2f0c426d771e6563af43d7f84b5d608fc097952f (HEAD -> master)
Author: Donatas Petrauskas <donatas.petr@gmail.com>
Date:   Tue Nov 27 13:00:45 2018 +0200

    Address "World".

commit 7587f907216d214c987908969713d6b3497d1503
Author: Donatas Petrauskas <donatasp@wix.com>
Date:   Tue Nov 27 12:59:17 2018 +0200

    Add README.md

```

Behold! We just went back in time. Might look like some sort of a spell, but don't worry. We are going to dispel all the magic.

> :point_right: I understand (and actually quite appreciate) the fact that we are trying to make this tutorial more fun and friendly to a newbie. But things often seem magical to someone who writes their first JS script or uses the terminal to `tail -f` something or run `top d .02` or something like that - not to a person who went through the circles of interviews (including tech ones) to be hired as a Wix dev (even if one is a junior dev). We are open-sourcing this, yes, but I also do not actually expect people with no or little coding experience to tackle this. My suggestion is to drop references to magic. Again, just a suggestion.

-   HEAD is a reference to the latest commit on the currently selected branch. A caret at the end (^) is a special syntax for pointing to previous commits. So `HEAD^` points to second to last. `HEAD^^` – third to last. There is also way to do this using `~` (tilde). `HEAD~3` is the same as `HEAD^^^`.
-   `--hard` flag tells Git to discard all changes between HEAD and the commit we are resetting to. Be careful, this is a destructive action.

If you skip `--hard`, changes to files stay in the directory tree. This is useful for regrouping changes into a different set of commits. Changing history is very dangerous (as many science fiction stories warn us :alien:). The two repositories that shared the same history become incompatible and merging code from one into another can prove to be a rather tedious affair.

<a id="org3406d1f"></a>

# Sending your changes to the remote repository

GitHub, BitBucket, GitLab - these are several more out there are all platforms that offer free (or premium with extended features) hosting or Git repositories and are essential in sharing or storing code, collaborating on projects for distributed teams. At Wix we use GitHub to manage all our repos and, thus, much of the dev process, so this is the platform we will talk about going foreward.

Let's head to GitHub and create a new repository there. When creating an empty repository, you will be prompted with choosing how you would like it set up - create a new one via the command line, push existing code or do an import. You need to copy the first line of code in the second option, one suggesting to "push an existing repository from the command line".

The command you need will look something like this:

```sh
git remote add origin https://github.com/YOUR-GITHUB-USERNAME/your-repository-name.git
```

Once that's out of the way, run

```sh
$ git push -u origin master
```

Git refers to sending local code to a remote repository (once stored on GitHub in this case) as pushing. If you recall, we used `git clone` when downloading a repository. But what about fetching updates later on? There's `git pull` for that. Push and pull. A nice pair of commands you are going to use a lot!

`-u` flag is shorthand for `--set-upstream`. This means that above push command will mark remote origin as upstream. Subsequent `push` and `pull` operations will automatically connect to `origin`.

Exercise time! Using commands you already know, create a new file and push it to `origin` - and then see your changes appear on GitHub.

<a id="orge5df519"></a>

# Getting serious

Hopefully, up until now, everything went smoothly. However, this is not what usually happens in Real Life™. Reality is complicated. There are choices to make and conflicts to resolve.

<a id="org66489b1"></a>

## Merging & Rebasing

You have already encountered `git push`. Hopefully, you haven't seen a message like this one yet:

    To /Users/donatasp/projects/onboarding/copy2/../origin
     ! [rejected]        master -> master (fetch first)
    error: failed to push some refs to '/Users/donatasp/projects/onboarding/copy2/../origin'
    hint: Updates were rejected because the remote contains work that you do
    hint: not have locally. This is usually caused by another repository pushing
    hint: to the same ref. You may want to first integrate the remote changes
    hint: (e.g., 'git pull ...') before pushing again.
    hint: See the 'Note about fast-forwards' in 'git push --help' for details.

Don't mind the  file paths that specific to my machine. This is a generic message meaning that your local history is different from the remote one. You are correctly pointed to try to `git pull`. But what will happen if you do? First, Git will fetch new changes, then, by default, it will create a new commit pointing to both the latest changes in your local copy of the repository, as well as in the remote one. This new commit is called a merge commit.

Visualization of a merge commit:

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

History after `rebase` instead of `merge`:

```artist
+-----+     +-----+     +-----+     +------+     +------+
| #1  |<----+ #2  |<----+ #4  |<----+ #3   |<----+ #5   |
|     |     |     |     |     |     |      |     |      |
+-----+     +-----+     +-----+     +------+     +------+
```

Rebase will rewrite your commits and apply them on top of freshly pulled changes. Pushing will succeed now. Unless somebody else pushed while you were at it!

    $ git push
    Counting objects: 6, done.
    Delta compression using up to 8 threads.
    Compressing objects: 100% (2/2), done.
    Writing objects: 100% (6/6), 566 bytes | 566.00 KiB/s, done.
    Total 6 (delta 0), reused 0 (delta 0)
    To /Users/donatasp/projects/onboarding/copy2/../origin
       871da5f..1e86e17  master -> master

Most of teams at Wix have settled on using `rebase`. Linear history is a lot easier to deal with. This is what I recommend too, but ultimately it is your and your team's choice.

<a id="org53c4a84"></a>

## Conflicts

When I described `git pull` in the previous section, I actually skipped over a significant step. What happens if remote and local changes affect the same section in a file? There will be a **merge conflict**, unless Git manages to reconcile the differences. From time to time, file merging algorithms will bail out and leave you to deal with a mess.

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

This basically says that Git tried really hard, but that the README from divergent histories cannot be reconciled into one. Time to pick up your scalpel, doctor, and do some precision work. Let's peek inside that README file.

> :point_right: The above used to say "pick up your scalpel, doctor, and dive in." which I just found really creepy and graphical, so I rewrote it :)

```text
<<<<<<< HEAD
HELLO WORLD!
=======
HELLO WORLD
>>>>>>> Address world.
```

Git has actually added markers inside th file to help us see where issues are. Beginning and end of each conflict section (one such section in this example) are marked by angle brackets. Equal signs indicate where one version of history stops and another begins. In this case, the last commit contains "HELLO WORLD!" and one that cannot be merged is "HELLO WORLD". Your main goal is to choose which one is correct (or more appropriate).

But sometimes it's more complicated than picking a side. Changes in other places that did not produce merge conflict might have invalidated both versions. In that case, a rewrite is necessary.

When done, run `git rebase --continue`. Both histories are aligned now, time for push!

    $ git push
    Counting objects: 3, done.
    Writing objects: 100% (3/3), 266 bytes | 266.00 KiB/s, done.
    Total 3 (delta 0), reused 0 (delta 0)
    To /Users/donatasp/projects/onboarding/copy2/../origin
       871da5f..9640230  master -> master

After a few resolved conflicts you will gain an appreciation for small focused commits. For instance, avoid renaming variables throughout files if your task is to change background colors.

<a id="org9ec73bb"></a>

## Stashing

Say you have been working on some code. It's been a few hours and it looks nothing like what you started with. In the middle of that you notice an urgent JIRA ticket that calls for a global change of the border color. "Easy!" you proclaim and proceed to changing it in the code, but… The code is not there. It's moved! In fact, you moved it. “Wait… Should I commit this big change first? Or just discard everything and do the small change? I definitely don't wand to start over or combine my my unfinished work with this change. If only I could just set aside all my current progress somehow and deal with the ticket?". And indeed, you can! You can use `stash` to temporarily store all you uncommitted changes and clear working history. This will let you make the change to master, commit it, and get back to your unfinished code by "popping" the stashed draft.

Determined, you launch the terminal and type:

```sh
$ git stash -a
```

All uncommitted changes are now stored in a safe place. Master is clean. You apply the small fix of the border color, commit, push, and in no time the correct color is in production. Well done!

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

> :point_right: I guess I'm nitpicking here, but I am a bit confused. The above example speaks about having to make a change to a line of code which "I have moved". But then `git stash pop` spits out a whole new separate file? If I have been working with a separate file all this time, doesn't this mean I would not have faced a situation where I would have "moved" the line of code in question? Anyway, just a thought...

<a id="orga199d89"></a>

## Branching

Adding your changes within the master branch is the recommended way of doing git at Wix. Continuous delivery, feature changes, and software testing practices dictate that we avoid splitting our development into separate feature branches. We choose quick iterations over big changes and monstrous releases.

However, it is totally okay to branch off master to create a pull request and ask for a code review. For some repositories, write permissions are restricted to team members only, so a pull request is the way to go.

If you don't have access to the repository, start by forking it on GitHub. If you do have access, you can work with the original repository. Clone the respective repo to your local machine using

    git clone <repoURL>

and create a new branch for your changes:

```sh
$ git checkout -b awesome-new-feature master
```

Yeah, I know. Why should I use `checkout` to create a branch? Naming things is tough. Luckily, at this point, you can focus on writing your code.

> :point_right:  "Why should I use `checkout` to create a branch?" above is followed by no answer at all. I don't think that's a rhetorical question. Is it?

When you are done, it's time to send the code back to your fork or original repo on GitHub.

```sh
$ git push -u origin awesome-new-feature master
```

Do you remember what `-u` means? Spoiler: it's an alias for `--set-upstream`.

If you visit the original project's page on GitHub, it will prompt you to create a pull request. Just follow GitHub's lead and you will be done in no time.

Congratulations! Your code is ready for review. Let's hope nobody finds any issues. :wink:

<a id="org72237cc"></a>

# What's Next?

Believe it or not, there is plenty more to know about Git and GitHub. If you get stuck, don't hesitate to ask for help. Your colleagues will be happy to give you a hand. Here's also some further reading with a great deal of tricks and interesting facts at <https://git-scm.com/doc>.

Hope you enjoyed this section!

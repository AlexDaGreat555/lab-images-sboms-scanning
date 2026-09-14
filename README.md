# Images, SBOMs, and Scanning Lab

Use Syft and Grype to investigate this service's container image, revise its Dockerfile to address vulnerabilities, and compare the results.
Follow the [Lab instructions](https://cmu-devops.github.io/labs/lab03/).

## Get started

Start Docker on your computer, clone this repository, and open it in VS Code using **Dev Containers: Reopen in Container**.
Run commands from the repository root inside the devcontainer.
Check the tools and download the vulnerability database:

```bash
docker info
syft version
grype version
grype db update
grype db status
```

Docker should report a running server, the tools should print their versions, and the database status should be valid.
The database download needs an internet connection and may take a few minutes.
If Docker cannot connect, check that it is running on your computer and reopen the devcontainer.
If the download fails, check your connection and rerun `grype db update`.

Build the original image and check that it runs:

```bash
docker build --platform linux/amd64 --tag lab03:before .
./scripts/smoke-test lab03:before
```

Use `linux/amd64` because the supplied base-image digest identifies that platform.
Docker Desktop supports emulation on Apple silicon.
The smoke test checks the status and response body of `/health` and removes its container afterward.

## Work on the lab

* Generate an SBOM with Syft, then scan that SBOM with Grype.
* Save your original reports in `.lab-results/`, which Git ignores.
* Edit `Dockerfile` to address the findings and keep the supplied application working.
* Rebuild as `lab03:after`, run the smoke test, and generate and scan a fresh SBOM.
* Explain what changed and any remaining findings in your lab notes.
* Trace one package affected by a finding you addressed from its source in the original image to its final version or absence, using both SBOMs, and explain what happened to the associated scan finding.

Export your notes as a PDF and submit them through Canvas, answering the three questions in Task 4 of the lab instructions.
Include the relevant Dockerfile diff or changed lines in your notes.
Keep generated SBOMs and scan reports locally for comparison.

Grype uses current advisory data, so findings can change over time.
There is no prescribed replacement image or requirement for an empty scan.

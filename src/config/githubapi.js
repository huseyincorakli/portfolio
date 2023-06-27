import { Octokit } from 'octokit';
const octokit = new Octokit({
    auth: "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"
  });

 const data=async ()=>{
    const result = await octokit.request("GET /user/repos")
    console.log()
}



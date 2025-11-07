const helper = (project) => {
    const temp = 
`
\\resumeProjectHeading
{\\textbf{${project.project_name ? project.project_name : ''}} $|$ \\underline{\\emph{\\href{${project.project_github ? project.project_github : ''}}{GitHub}}} ${project.project_link ? `$|$ \\underline{\\emph{\\href{${project.project_link ? project.project_link : ''}}{Project Link}}}` : ''}} {}
      \\resumeItemListStart
      ${project.project_desc.map(curr_desc => 
        `\\resumeItem{${curr_desc}}`
        ).join('')}
        \\resumeItemListEnd
`

    return temp;
}

const getProjectsTex = (projects) => {

    if(projects.length === 0) {
        return '';
    }

    projects = JSON.parse(JSON.stringify(projects).replace(/%/g, '\\\\%'));

    projectsTex = 
`

%----------- PROJECTS -----------

\\section{Projects}
  \\vspace{3pt}
  \\resumeSubHeadingListStart

  ${projects.map(curr => helper(curr)).join('')}

  \\resumeSubHeadingListEnd

`
    
    return projectsTex;
}

module.exports = {getProjectsTex};
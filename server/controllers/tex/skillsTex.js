const helper = (skill) => {
    const temp = 
`
    \\textbf{${skill.skill_title ? skill.skill_title : ''}:}{ ${skill.skill_text ? skill.skill_text : ''}} \\\ \\vspace{3pt}
`

    return temp;
}

const getSkillsTex = (skills) => {
    if(skills.length === 0) {
        return '';
    }

    skills = JSON.parse(JSON.stringify(skills).replace(/%/g, '\\\\%'));

    skillsTex = 
`

%----------- SKILLS -----------

\\section{Skills}
  \\vspace{2pt}
  \\resumeSubHeadingListStart
    \\small{\\item{

  ${skills.map(curr => helper(curr)).join('')}
}}
\\resumeSubHeadingListEnd

`
    return skillsTex;
}

module.exports = {getSkillsTex};
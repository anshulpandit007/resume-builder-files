const helper = (curr_ach) => {
    const temp = `\\resumeItem{${curr_ach.ach_text} ${curr_ach.ach_link ? `$|$ \\underline{\\emph{\\href{${curr_ach.ach_link ? curr_ach.ach_link : ''}}{Link}}}` : ''}}`

    return temp;
}

const getAchTex = (ach) => {
    if(ach.length === 0) {
        return '';
    }

    for(let i = 0; i<ach.length; i++) {
        ach[i].ach_text = ach[i].ach_text.replace(/%/g, "\\%");
        ach[i].ach_link = ach[i].ach_link.replace(/%/g, "\\%");
    }

    achTex = 
`

%----------- AWARDS & ACHIEVEMENTS -----------

\\section{Awards \\& Achievements}
  \\vspace{2pt}
  \\resumeItemListStart
  ${ach.map(curr => helper(curr)).join('')}
  \\resumeItemListEnd
`

    return achTex;
}

module.exports = {getAchTex};
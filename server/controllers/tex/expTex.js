const helper = (exp) => {
    const temp = 
`
\\resumeSubheading
      {${exp.company_name ? exp.company_name: ''}}{${exp.job_location ? exp.job_location: ''}}
      {${exp.job_title ? exp.job_title: ''}}{${exp.job_start_date ? exp.job_start_date: ''} \\textbf{--} ${exp.job_end_date ? exp.job_end_date: ''}}
      \\resumeItemListStart
      ${exp.job_desc.map(curr_desc => 
        `\\resumeItem{${curr_desc}}`
        ).join('')}
        \\resumeItemListEnd
`

    return temp;
}

const getExpTex = (exp) => {
    if(exp.length === 0) {
        return '';
    }

    exp = JSON.parse(JSON.stringify(exp).replace(/%/g, '\\\\%'));

    const expTex = 
`

%----------- EXPERIENCE -----------

\\section{Experience}
  \\vspace{3pt}
  \\resumeSubHeadingListStart

  ${exp.map(curr => helper(curr)).join('')}

  \\resumeSubHeadingListEnd

`

    return expTex;
}

module.exports = {getExpTex};
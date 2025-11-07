const getIntroTex = (intro) => {
    if(intro === {}) return '';

    // Handle the % sign
    intro = JSON.parse(JSON.stringify(intro).replace(/%/g, '\\\\%'));

    const introTex = 
`

%---------- HEADING ----------

\\begin{center}
    \\textbf{\\Huge \\scshape ${intro.name ? intro.name: ''}} \\\\ \\vspace{3pt}
    \\small
    ${intro.mob_num ? (`\\faMobile \\hspace{.5pt} {${intro.mob_num ? intro.mob_num : ''}}`) : ''}
    $|$
    ${intro.email ? (`\\faAt \\hspace{.5pt} \\href{mailto:${intro.email ? intro.email : ''}}{${intro.email ? intro.email : ''}}`) : ''}
    $|$
    ${intro.linkedin ? (`\\faLinkedinSquare \\hspace{.5pt} \\href{${intro.linkedin}}{LinkedIn}`) : ``}
    $|$
    ${intro.github ? (`\\faGithub \\hspace{.5pt} \\href{${intro.github}}{Github}`) : ``}
    $|$
    ${intro.portfolio_link ? (`\\faGlobe \\hspace{.5pt} \\href{${intro.portfolio_link}}{Portfolio}`) : ``}
\\end{center}

`;

    return introTex;
}

module.exports = {getIntroTex};
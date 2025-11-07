const helper = (curr_profile) => {
    const temp = `\\resumeItem{\\underline{\\href{${curr_profile.profile_link ? curr_profile.profile_link : ''}}{${curr_profile.profile_about}}}}`
    return temp;
}

const getProfilesTex = (profiles) => {
    if(profiles.length === 0) {
        return '';
    } 

    profiles = JSON.parse(JSON.stringify(profiles).replace(/%/g, '\\\\%'));

    profilesTex = 
`

%----------- Profiles -----------

\\section{Profiles}
  \\vspace{2pt}
  \\resumeItemListStart
  ${profiles.map(curr => helper(curr)).join('')}
  \\resumeItemListEnd
`
    return profilesTex;
}
module.exports = {getProfilesTex};
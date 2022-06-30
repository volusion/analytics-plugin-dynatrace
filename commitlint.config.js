module.exports = {
    extends: ['@commitlint/config-conventional'],
    rules: {
        'subject-case': [0, 'always'],
        'jira-commit-rule': [2, 'always']
    },
    plugins: [
        {
            rules: {
                'jira-commit-rule': ({ subject }) => {
                    if (!subject) {
                        return [false, 'Subject may not be empty'];
                    }

                    const jiraCompleteRejex = /^([A-Z0-9]){1,}-([0-9]){1,}/;
                    const jiraPatternSearch = subject.search(jiraCompleteRejex);

                    return [
                        jiraPatternSearch !== -1,
                        'Subject must begin with a Jira project and ID, ie PROJ-123'
                    ];
                }
            }
        }
    ]
};

function transformToHierarchy(data) {
    // Step 1: Clean and normalize the data - handle potential whitespace in keys
    const relationships = data.map(item => {
        const cleanItem = {};
        Object.keys(item).forEach(key => {
            const cleanKey = key.trim();
            cleanItem[cleanKey] = item[key];
        });
        return {
            manager: cleanItem.manager_name,
            employee: cleanItem.login_name || cleanItem['login_name '] // Handle potential trailing space
        };
    });

    // Step 2: Get all people who are managers
    const allManagers = new Set(relationships.map(r => r.manager));
    
    // Step 3: Get all people who are employees
    const allEmployees = new Set(relationships.map(r => r.employee));
    
    // Step 4: Find root managers (managers who are not employees of anyone)
    const rootManagers = [...allManagers].filter(manager => !allEmployees.has(manager));

    // Step 5: Build hierarchy recursively
    function buildHierarchy(managerName) {
        const directReports = relationships
            .filter(r => r.manager === managerName)
            .map(r => r.employee);

        const node = {
            name: managerName
        };

        // Step 6: Only add subordinate property if there are direct reports
        if (directReports.length > 0) {
            node.subordinate = directReports.map(employee => {
                // Check if this employee is also a manager
                if (allManagers.has(employee)) {
                    return buildHierarchy(employee);
                } else {
                    return { name: employee };
                }
            });
        }

        return node;
    }

    // Step 7: Build the complete hierarchy
    return rootManagers.map(rootManager => buildHierarchy(rootManager));
}

// Example usage:
const sectionA = [
    {
        "manager_name": "nssi",
        "login_name": "nishanthi"
    },
    {
        "manager_name": "mbarcelona",
        "login_name ": "nssi"
    },
    {
        "manager_name": "nishanthi",
        "login_name": "markcorderoi"
    },
    {
        "manager_name": "mbarcelona",
        "login_name ": "richard"
    },
    {
        "manager_name": "letecia",
        "login_name ": "rudy"
    }
];

const sectionB = transformToHierarchy(sectionA);
console.log(JSON.stringify(sectionB, null, 2));
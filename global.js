const {check} = require('express-validator');

const sidebars = [
    {
        title: "Dashboard",
        icon: "fas fa-tachometer-alt",
        href: "/"
    },
    {
        title: "Layanan",
        icon: "fas fa-briefcase",
        href: "/services"
    },
    {
        title: "Pesanan",
        icon: "fas fa-folder-open",
        href: "/orders"
    },
    {
        title: "Kontak",
        icon: "far fa-id-card",
        href: "/contact"
    },
    {
        title: "Laporan",
        icon: "far fa-flag",
        href: "/report"
    },
];

const schemaViewParams = obj => {
    return {
        title: "Page",
        active: "",
        isShow: false,
        isCreate: false,
        isEdit: false,
        create: false,
        action: "",
        query: {},
        errors: {},
        message: null,
        sidebars,
        ...obj
    }
}

const appendValidation = (validations = {}) => {
    let result = [];
    if(typeof validations == "object") {
        Object.keys(validations).forEach(fieldName => {
            let field = check(fieldName);
            validations[fieldName].forEach(rule => {
                if(field[rule]) {
                    field[rule]();
                } else {
                    console.log(`rule ${rule} for field ${fieldName} is not found`)
                }
            })
            result.push(field);
        })
    }

    return result;
}

module.exports = {
    schemaViewParams,
    appendValidation
}
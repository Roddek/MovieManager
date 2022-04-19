/**
 * Megjeleníti az adott oldalt
 */

module.exports = (objectrepo, pageName) => {
    return (req, res, next) => {
        console.log('render: ' + pageName, res.locals);
        res.render(pageName, res.locals);
    };
};
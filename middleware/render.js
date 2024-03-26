/**
 * Megjeleníti a paraméterben kapott oldalt
 */

module.exports = (objectrepo, pageName) => {
    return (req, res, next) => {
        res.render(pageName, res.locals);
    };
};
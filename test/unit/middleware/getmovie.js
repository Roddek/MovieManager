const expect = require('chai').expect;
const getmovieMW = require('../../../middleware/movies/getmovie');

describe('getmovie middleware', function(){
    it('should return one movie', function (done) {
        const mw = getmovieMW({
            MovieModel:{
                findOne: (p1, cb) => {
                    expect(p1._id).to.be.eql('42');
                    expect(p1._user).to.be.eql('userid');
                    cb(null, 'mockmovie');
                }
            }
        });
        const resMock = {
            locals: {}
        }
        mw(
            {
                params: { movieid: '42' },
                session: { user_id: 'userid' }
            },
            resMock,
            (err) => {
                expect(err).to.be.eql(undefined);
                expect(resMock.locals).to.be.eql({movie: 'mockmovie'});
                done();
            }
        )
    });
    it('should call next because of error', function (done) {
        const mw = getmovieMW({
            MovieModel:{
                findOne: (p1, cb) => {
                    expect(p1._id).to.be.eql('42');
                    expect(p1._user).to.be.eql('userid');
                    cb('db error', null);
                }
            }
        });

        mw(
            {
                params: { movieid: '42' },
                session: { user_id: 'userid' }
            },
            {},
            (err) => {
                expect(err).to.be.eql('db error');
                done();
            }
        )
    });
    it('should redirect /movies because no movie found', function (done) {
        const mw = getmovieMW({
            MovieModel:{
                findOne: (p1, cb) => {
                    expect(p1._id).not.to.be.eql('42');
                    expect(p1._user).to.be.eql('userid');
                    cb(null, null);
                }
            }
        });
        mw(
            {
                params: { movieid: '13' },
                session: { user_id: 'userid' }
            },
            {
                redirect: (where) => {
                    expect(where).to.be.eql('/movies');
                    done();
                }
            },
            (err) => {}
        )
    });
})
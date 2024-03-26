const expect = require('chai').expect;
const authMW = require('../../../middleware/auth/auth');

describe('registraition middleware', function(){
    it('should return next due to correct user_id', function (done) {

        const mw = authMW({});

        const UserMockModel = {
            session: { user_id: '42'}
        }

        mw(
            UserMockModel,
            {},
            (err) => {
                expect(UserMockModel.session.user_id).to.be.eql('42');
                done();
            }
        );
    });
    it('should return redurect / because user_id is undefined', function (done) {

        const mw = authMW({});

        const UserMockModel = {
            session: { user_id: undefined }
        }

        mw(
            UserMockModel,
            {
                redirect: (where) => {
                    expect(where).to.be.eql('/');
                    done();
                }
            },
            (err) => {}
        );
    });
})
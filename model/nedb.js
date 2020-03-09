const Datastore = require('nedb');
var nedb = new Datastore

class DAO
{
    constructor(dbFilePath)
    {
        //Run database as a file
        if (dbFilePath)
        {
            this.db = new Datastore({filename: dbFilePath, autoload: true});
            console.log("DB Connected to file: ", dbFilePath);
        }
        else
        {
            //In Memory
            this.db = new Datastore();
        }
    }
    init()
    {
        this.db.insert
        ({
            guestbookEntryField: 'guestbookEntryField', 
            title: 'like',
            content: 'nice', 
            published: '17/02/2020'
        })
        console.log('new entry inserted');
    }
    insert(_guestentry = 'guestbookEntryField', _title, _content, _published)
    {
        this.db.insert
        ({
            guestbookEntryField: _guestentry, 
            title: _title,
            content: _content, 
            published: _published
        })
        console.log('new manual entry inserted');
    }
    all()
    {
        return new Promise((resolve, reject) =>
        {
            this.db.find({}, function(err, entries)
            {
                if (err) 
                {
                    reject(err);
                    console.log('rejected');
                }
                else
                {
                    resolve(entries);
                    console.log('resolved')
                }
            })
        });
    }
}
module.exports = DAO;
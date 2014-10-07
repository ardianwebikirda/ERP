Ext.define('ERPh.module.Operational.store.Attendance',{
    extend      : 'Ext.data.Store',
    model       : 'ERPh.module.Operational.model.Attendance',
    requires    : [
        'ERPh.module.Operational.model.Attendance'
    ],
    autoLoad    : true,
    autoSync    : false,
    pageSize    : 20,
    root        : {
        expanded        : false
    },
    proxy       : {
        type            : 'ajax',
        api             : {
            read    : BASE_URL + 'Operational/c_attendance/getAttendance'
        },
        actionMethods   : {
            read    : 'POST'
        },
        reader          : {
            type            : 'json',
            root            : 'data',
            successProperty : 'success',
            totalProperty   : 'total'
        },
        writer          : {
            type            : 'json',
            writeAllFields  : true,
            root            : 'data',
            encode          : true
        }
    }
});
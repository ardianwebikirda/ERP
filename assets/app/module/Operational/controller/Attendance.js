Ext.define('ERPh.module.Operational.controller.Attendance', {
    extend  : 'Ext.app.Controller',
    CheckedDataEdit: [],
    

    init: function() {
        var me = this;
        me.getStore('ERPh.module.Operational.store.AttEmployee').load();
        // me.getStore('ERPh.module.Operational.store.Attendance').load();
        me.control({
            "#gridattendance"                          : {
               itemclick: me.groupAttendance
            },
            "gridattendance  button[action=delete]"    : {
                click: me.del
            },  
            "gridattendance textfield[action=search]"  : {
               keypress: me.search
            },
            "gridattendance button[action=print]"      : {
               click: me.print
            }, 
            "formattendance  button[action=save]"      : {
                click: me.save
            },
            "formattendance button[action=update]"     : {
               click: me.update
            }, 
            "formattendance  button[action=reset]"     : {
                click: me.reset
            },
            "formattendance #id_country"               : {
                select: me.loadComboProvince
            },
            "formattendance #id_province"               : {
                select: me.loadComboRegion
            },
            "formattendance  #id_jobtitle"     : {
                select: me.cariJT
            },
            "gridupload  button[action=dumping]"    : {
                click: me.dumping
            },
            "uploadform button[action=dump]"    : {
                click: me.dump
            },  
            "griddepartment2"    : {
                itemdblclick: me.addDepartment2
            }, 
            "griddepartment2  button[action=delete]" : {
                click: me.delDept
            },
            "formdepartment2 button[action=saveDept]"   : {
                click: me.saveDept
            } 
        });
        me.callParent(arguments);
    },

    reloadStore: function(){
        var me = this;
        me.getStore('ERPh.module.Operational.store.Attendance').reload();
        // me.getStore('ERPh.module.Operational.store.Department2').reload();
    },

    dumping: function(btn){
        Ext.create('ERPh.module.Operational.view.form.UploadForm').show();
       // console.log('hai');
    },

    groupAttendance: function(me, record, item, index, e, eOpts) {//Edit
        var form = Ext.getCmp('formattendance');
        form.getForm().setValues(record.data);
        var saveButton = form.down('button[action=save]');
        saveButton.setDisabled(true);

        var updateButton = form.down('button[action=update]');
        updateButton.setDisabled(false);

        var comboProvince = Ext.ComponentQuery.query('formattendance #id_province')[0];
        comboProvince.setDisabled(false);

        var comboRegion = Ext.ComponentQuery.query('formattendance #id_region')[0];
        comboRegion.setDisabled(false);


    },

    del: function(gridPanel, selected){
        var me = this;
        me.CheckedDataEdit = new Array();
        var record = gridPanel.up('grid').getSelectionModel().getSelection();
        Ext.each(record, function(selected){
            me.CheckedDataEdit.push({
                id  : selected.data.id
            });
        });  
        Ext.MessageBox.show({
            title           : 'Konfirmasi',
            msg             : 'Anda yakin akan menghapus data yang terseleksi?',
            buttons         : Ext.Msg.YESNO,
            icon            : Ext.MessageBox.WARNING,
            width           : 450,
            fn              : function(btn, evtObj){
                if (btn === 'yes') {
                    Ext.Ajax.request({
                        url             : BASE_URL + 'Operational/c_attendance/delAttendance',
                        method          : 'POST',
                        params          : {post : Ext.encode(me.CheckedDataEdit)},
                        success         : function(response){
                            var data    = Ext.JSON.decode(response.responseText);
                            // console.log(data);
                            me.reset();
                            var storeApproval = Ext.getStore('ERPh.module.Operational.store.Attendance');
                            storeApproval.removeAll();
                            storeApproval.add(data.data);
                        }
                    });
                }
            }
        });
    },
    search: function(field, evt, opts){
        var value       = field.getValue();
            Ext.Ajax.request({
                url     : BASE_URL + 'Operational/c_attendance/searchAttendance',
                method  : 'POST',
                params  : {name : value},
                success : function(response){
                    var data    = Ext.JSON.decode(response.responseText);
                    if(data.success){
                            var storeApproval = Ext.getStore('ERPh.module.Operational.store.Attendance');
                            storeApproval.removeAll();
                            storeApproval.add(data.data);
                    }
                }
            });
    },
    print : function(){
        window.location = BASE_URL + 'Operational/c_attendance/printAttendance/';
    },
    save: function(btn, evt, opts){
        var me              = this;
        var form            = btn.up('formattendance').getForm();
        var fname           = form.findField('fname').getValue();
        var lname           = form.findField('lname').getValue();
        var username        = form.findField('username').getValue();
        var gender          = form.findField('gender').getValue();
        var religion        = form.findField('id_religion').getValue();
        var bod_place       = form.findField('bod_place').getValue();
        var bod             = form.findField('bod').getValue();
        var marital_status  = form.findField('marital_status').getValue();
        var noc             = form.findField('noc').getValue();
        var id_education    = form.findField('id_education').getValue();
        var blood           = form.findField('blood').getValue();
        var photo           = form.findField('photo').getValue();
        var address         = form.findField('address').getValue();
        var id_country      = form.findField('id_country').getValue();
        var id_province     = form.findField('id_province').getValue();
        var id_region       = form.findField('id_region').getValue();
        var zip             = form.findField('zip').getValue();
        var code            = form.findField('code').getValue();
        var id_company      = form.findField('id_company').getValue();
        var id_department   = form.findField('id_department').getValue();
        var id_jobtitle     = form.findField('id_jobtitle').getValue();
        var id_jobstatus    = form.findField('id_jobstatus').getValue();
        var hire            = form.findField('hire').getValue();
        var expired         = form.findField('expired').getValue();
        var supervisor      = form.findField('supervisor').getValue();
        var phone           = form.findField('phone').getValue();
        var mobile1         = form.findField('mobile1').getValue();
        var mobile2         = form.findField('mobile2').getValue();
        var email1          = form.findField('email1').getValue();
        var email2          = form.findField('email2').getValue();
        var id_bank         = form.findField('id_bank').getValue();
        var bank_account    = form.findField('bank_account').getValue();
        var idcard_type     = form.findField('idcard_type').getValue();
        var idcard_number   = form.findField('idcard_number').getValue();
        var tax             = form.findField('tax').getValue();
        var isactive        = form.findField('isactive').getValue();
        var isovertime      = form.findField('isovertime').getValue();
        var isresign        = form.findField('isresign').getValue();
        // console.log('hai');
        // console.log(marital_status, noc, idcard_type, idcard_number);
        Ext.Ajax.request({
            url     : BASE_URL + 'Operational/c_attendance/saveAttendance',
            method  : 'POST',
            params  : {
                fname           : fname,
                lname           : lname,
                username        : username,
                gender          : gender,
                religion        : religion,
                bod_place       : bod_place,
                bod             : bod,
                marital_status  : marital_status,
                noc             : noc,
                id_education    : id_education,
                blood           : blood,
                photo           : photo,
                address         : address,
                id_country      : id_country,
                id_province     : id_province,
                id_region       : id_region,
                zip             : zip,
                code            : code,
                id_company      : id_company,
                id_department   : id_department,
                id_jobtitle     : id_jobtitle,
                id_jobstatus    : id_jobstatus,
                hire            : hire,
                expired         : expired,
                supervisor      : supervisor,
                phone           : phone,
                mobile1         : mobile1,
                mobile2         : mobile2,
                email1          : email1,
                email2          : email2,
                id_bank         : id_bank,
                bank_account    : bank_account,
                idcard_type     : idcard_type,
                idcard_number   : idcard_number,
                tax             : tax,
                isactive        : isactive,
                isovertime      : isovertime,
                isresign        : isresign
            },
            success : function(response){
                var data    = Ext.JSON.decode(response.responseText);
                if(data.total === 1){
                    Ext.MessageBox.show({
                        title           : 'Informasi',
                        msg             : 'Data Telah Tersimpan',
                        icon            : Ext.MessageBox.INFO,
                        buttons         : Ext.MessageBox.OK
                    });
                    // win.close();
                    me.reset();
                    me.getStore('ERPh.module.Operational.store.Attendance').removeAll();
                    me.getStore('ERPh.module.Operational.store.Attendance').reload();
                }else if (data.total === 2){
                    Ext.MessageBox.show({
                        title           : 'Error',
                        msg             : 'Attendance Telah Terdaftar - Silahkan Gunakan Attendance Lain',
                        icon            : Ext.MessageBox.ERROR,
                        buttons         : Ext.MessageBox.OK
                    });
                } else {
                    Ext.MessageBox.show({
                        title           : 'Error',
                        msg             : 'Pengisian Data Salah',
                        icon            : Ext.MessageBox.ERROR,
                        buttons         : Ext.MessageBox.OK
                    });                   
                }
            }
        });   
    },
    update: function(btn){
        var me              = this;
        var form            = btn.up('formattendance').getForm();
        var id              = form.findField('id').getValue();
        var fname           = form.findField('fname').getValue();
        var lname           = form.findField('lname').getValue();
        var username        = form.findField('username').getValue();
        var gender          = form.findField('gender').getValue();
        var religion        = form.findField('id_religion').getValue();
        var bod_place       = form.findField('bod_place').getValue();
        var bod             = form.findField('bod').getValue();
        var marital_status  = form.findField('marital_status').getValue();
        var noc             = form.findField('noc').getValue();
        var id_education    = form.findField('id_education').getValue();
        var blood           = form.findField('blood').getValue();
        var photo           = form.findField('photo').getValue();
        var address         = form.findField('address').getValue();
        var id_country      = form.findField('id_country').getValue();
        var id_province     = form.findField('id_province').getValue();
        var id_region       = form.findField('id_region').getValue();
        var zip             = form.findField('zip').getValue();
        var code            = form.findField('code').getValue();
        var id_company      = form.findField('id_company').getValue();
        var id_department   = form.findField('id_department').getValue();
        var id_jobtitle     = form.findField('id_jobtitle').getValue();
        var id_jobstatus    = form.findField('id_jobstatus').getValue();
        var hire            = form.findField('hire').getValue();
        var expired         = form.findField('expired').getValue();
        var supervisor      = form.findField('supervisor').getValue();
        var phone           = form.findField('phone').getValue();
        var mobile1         = form.findField('mobile1').getValue();
        var mobile2         = form.findField('mobile2').getValue();
        var email1          = form.findField('email1').getValue();
        var email2          = form.findField('email2').getValue();
        var id_bank         = form.findField('id_bank').getValue();
        var bank_account    = form.findField('bank_account').getValue();
        var idcard_type     = form.findField('idcard_type').getValue();
        var idcard_number   = form.findField('idcard_number').getValue();
        var tax             = form.findField('tax').getValue();
        var isactive        = form.findField('isactive').getValue();
        var isovertime      = form.findField('isovertime').getValue();
        var isresign        = form.findField('isresign').getValue();
        // console.log(id);
        Ext.MessageBox.show({
            title           : 'Konfirmasi',
            msg             : 'Anda yakin akan merubah data?',
            buttons         : Ext.Msg.YESNO,
            icon            : Ext.MessageBox.WARNING,
            width           : 450,
            fn              : function(btn, evtObj){
                if (btn == 'yes') {
                    Ext.Ajax.request({
                        url     : BASE_URL + 'Operational/c_attendance/editAttendance',
                        method  : 'POST',
                        params  : {
                            id              : id,
                            fname           : fname,
                            lname           : lname,
                            username        : username,
                            gender          : gender,
                            religion        : religion,
                            bod_place       : bod_place,
                            bod             : bod,
                            marital_status  : marital_status,
                            noc             : noc,
                            id_education    : id_education,
                            blood           : blood,
                            photo           : photo,
                            address         : address,
                            id_country      : id_country,
                            id_province     : id_province,
                            id_region       : id_region,
                            zip             : zip,
                            code            : code,
                            id_company      : id_company,
                            id_department   : id_department,
                            id_jobtitle     : id_jobtitle,
                            id_jobstatus    : id_jobstatus,
                            hire            : hire,
                            expired         : expired,
                            supervisor      : supervisor,
                            phone           : phone,
                            mobile1         : mobile1,
                            mobile2         : mobile2,
                            email1          : email1,
                            email2          : email2,
                            id_bank         : id_bank,
                            bank_account    : bank_account,
                            idcard_type     : idcard_type,
                            idcard_number   : idcard_number,
                            tax             : tax,
                            isactive        : isactive,
                            isovertime      : isovertime,
                            isresign        : isresign
                        },
                        success : function(response){
                            var data    = Ext.JSON.decode(response.responseText);
                            // console.log(data.total);
                            if(data.total === 1){
                                Ext.MessageBox.show({
                                    title           : 'Informasi',
                                    msg             : 'Data Telah Dirubah',
                                    icon            : Ext.MessageBox.INFO,
                                    buttons         : Ext.MessageBox.OK
                                });
                                // win.close();
                                me.reset();
                                me.getStore('ERPh.module.Operational.store.Attendance').removeAll();
                                me.getStore('ERPh.module.Operational.store.Attendance').reload();
                            }else if (data.total === 2){
                                Ext.MessageBox.show({
                                    title           : 'Error',
                                    msg             : 'Attendance Telah Terdaftar - Silahkan Gunakan Attendance Lain',
                                    icon            : Ext.MessageBox.ERROR,
                                    buttons         : Ext.MessageBox.OK
                                });
                            } else {
                                Ext.MessageBox.show({
                                    title           : 'Error',
                                    msg             : 'Pengisian Data Salah',
                                    icon            : Ext.MessageBox.ERROR,
                                    buttons         : Ext.MessageBox.OK
                                });                   
                            }
                        }
                    });
                }
            }
        });      
    },
    reset: function(btn) {//Reset Form
        var form        = Ext.getCmp('formattendance');
        var grid        = Ext.getCmp('griddepartment2');
        form.getForm().reset();

        var saveButton = form.down('button[action=save]');
        saveButton.setDisabled(false);

        var updateButton = form.down('button[action=update]');
        updateButton.setDisabled(true);

        var me = this;
        me.getStore('ERPh.module.Operational.store.Attendance').reload();
        me.getStore('ERPh.module.Operational.store.Department2').reload();
    },
    addDepartment2: function(grid, record, item, index, e, eOpts){
        if(record.data.id_attendance ===''||record.data.id_attendance === null){
             Ext.MessageBox.show({
                title           : 'Error',
                msg             : 'Pilih Attendance Terlebih Dahulu',
                icon            : Ext.MessageBox.ERROR,
                buttons         : Ext.MessageBox.OK
            });  
         } else {
            // this.getStore('ERPh.module.Operational.store.Attendance').load();
            var win = Ext.create('ERPh.module.Operational.view.form.FormDepartment2');
            win.show();
            win.down('form').loadRecord(record);
        }
    },
    saveDept: function(btn, evt, opts){
        var me          = this;
        var win         = btn.up('window');
        var form        = win.down('form').getForm();
        var fname       = form.findField('fname').getForm();
        var lname       = form.findField('lname').getForm(); 
        var id_comp     = form.findField('id_company').getValue();
        var id_dept     = form.findField('id_department').getValue();
        var isactive    = form.findField('isactive').getValue();

        console.log(id_comp);

        Ext.Ajax.request({
            url     : BASE_URL + 'Operational/c_attendance/saveDepartment2',
            method  : 'POST',
            params  : {
                id_dept     : id_dept,
                id_comp     : id_comp,
                isactive    : isactive
            },
            success : function(response){
                var data    = Ext.JSON.decode(response.responseText);
                if(data.total === 1){
                    Ext.MessageBox.show({
                        title           : 'Informasi',
                        msg             : 'Data Telah Tersimpan',
                        icon            : Ext.MessageBox.INFO,
                        buttons         : Ext.MessageBox.OK
                    });
                    win.close();
                    me.getStore('ERPh.module.Operational.store.Attendance').reload();
                    me.getStore('ERPh.module.Operational.store.Department2').reload();
                    me.reset();
                }else if (data.total === 2){
                    Ext.MessageBox.show({
                        title           : 'Error',
                        msg             : 'Department Telah Terdaftar - Silahkan Gunakan Department Lain',
                        icon            : Ext.MessageBox.ERROR,
                        buttons         : Ext.MessageBox.OK
                    });
                } else {
                    Ext.MessageBox.show({
                        title           : 'Error',
                        msg             : 'ID has indexed, Please Contact Your Vendor..!',
                        icon            : Ext.MessageBox.ERROR,
                        buttons         : Ext.MessageBox.OK
                    });                   
                }
            }
        });   
    },

    delDept: function(gridPanel, selected){
        var me = this;
        me.CheckedDataEdit = new Array();
        var record = gridPanel.up('grid').getSelectionModel().getSelection();
        Ext.each(record, function(selected){
            me.CheckedDataEdit.push({
                id  : selected.data.id
            });
        });  
        Ext.MessageBox.show({
            title           : 'Konfirmasi',
            msg             : 'Anda yakin akan menghapus data yang terseleksi?',
            buttons         : Ext.Msg.YESNO,
            icon            : Ext.MessageBox.WARNING,
            width           : 450,
            fn              : function(btn, evtObj){
                if (btn === 'yes') {
                    Ext.Ajax.request({
                        url             : BASE_URL + 'Operational/c_attendance/delDepartment',
                        method          : 'POST',
                        params          : {post : Ext.encode(me.CheckedDataEdit)},
                        success         : function(response){
                            var data    = Ext.JSON.decode(response.responseText);
                            me.reset();
                            var storeApproval = Ext.getStore('ERPh.module.Operational.store.Department2');
                            storeApproval.removeAll();
                            storeApproval.add(data.data);
                        }
                    });
                }
            }
        });
    },

    loadComboProvince : function(combo, records){
        var comboProvince = Ext.ComponentQuery.query('formattendance #id_province')[0];
        comboProvince.setDisabled(true);
        comboProvince.setValue('');
        comboProvince.store.removeAll();

        var comboCountry    = Ext.ComponentQuery.query('formattendance #id_country')[0];
        var countryId       = comboCountry.getValue();
        comboProvince.store.load({
            params  : { countryId : countryId }
        });
        comboProvince.setDisabled(false);
    },

    loadComboRegion : function(combo, records){
        var comboRegion = Ext.ComponentQuery.query('formattendance #id_region')[0];
        comboRegion.setDisabled(true);
        comboRegion.setValue('');
        comboRegion.store.removeAll();

        var comboProvince   = Ext.ComponentQuery.query('formattendance #id_province')[0];
        provinceId          = comboProvince.getValue();
        comboRegion.store.load({
            params  : { provinceId : provinceId }
        });
        comboRegion.setDisabled(false);
    },


    //CONTROLLER UPLOAD EXCEL DISNI 
    dump : function(btn, evt, opts){
        var me      = this;
        var win     = btn.up('window');
        var form    = win.down('form').getForm();
        var dateatt = form.findField('dateatt').getValue();
        var csvfile = form.findField('csvfile').getValue();
        console.log('hai');
        console.log(dateatt, csvfile, form);
        if(form.isValid()){
            form.submit({
                url     : BASE_URL + 'Operational/c_attendance/upload',
                params  : {
                    dateatt : dateatt,
                    csvfile : csvfile
                },
                waitMsg : 'Uploading Attendance....',
                success : function(fp, o){
                    var msg     = 'Upload'+ o.result.filename +'Is Success';
                    var icon    = Ext.MessageBox.INFO;
                    if(!o.result.status){
                        var msg     = 'Upload is Failed Check Your File (max 2 MB, ext *.csv)';
                        var icon    = Ext.MessageBox.ERROR;
                    } else {
                        me.showMessage({
                            title  : 'MESSAGE',
                            msg    : msg,
                            icon   : icon,
                            buttons: Ext.MessageBox.OK
                        });
                        // me.getStore('Com.GatotKaca.ERP.module.HumanResources.store.UploadAttendance').removeAll();
                        // me.reloadUploadStore();
                    }
                    btn.up('window').close();
                }
            });            
        }
    }
});
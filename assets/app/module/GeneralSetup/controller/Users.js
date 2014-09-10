Ext.define('ERPh.module.GeneralSetup.controller.Users', {
    extend  : 'Ext.app.Controller',
    CheckedDataEdit: [],

    init: function() {
        var me = this;
        me.getStore('ERPh.module.GeneralSetup.store.Users').load();
        me.getStore('ERPh.module.GeneralSetup.store.UsersOrganisasi').load();
        me.control({
            "gridusers  button[action=delete]"          : {
                click: me.del
            }, 
            "#gridusers"                                 : {
               itemclick: me.viewUsers
            },            
            "formusers  button[action=save]"        : {
                click: me.save
            }, 
            "formusers  button[action=reset]"       : {
                click: me.reset
            },
            "gridusersorg"                          : {
               itemdblclick: me.addorg
            },
            "gridusers textfield[action=search]"    : {
               keypress: me.search
            },
            "gridusers button[action=print]"        : {
               click: me.print
            },
            "formusers button[action=update]"       : {
               click: me.update
            },
            "formusersorganisasi button[action=addusersorg]"       : {
               click: me.addusersorg
            }
        });
        me.callParent(arguments);
    },
    reloadStore: function(){
        var me = this;
        me.getStore('ERPh.module.GeneralSetup.store.Users').reload();
    },
    viewUsers: function(grid, record, item, index, e, eOpts){
        var id = record.data.id;
        var form = Ext.getCmp('formusers');
        var grid = Ext.getCmp('gridusersorg');
        form.getForm().setValues(record.data);

        var saveButton = form.down('button[action=save]');
        saveButton.setDisabled(true);
        // console.log(updateUsers);

        if(updateUsers == false) {
            var updateButton = form.down('button[action=update]');
            updateButton.setDisabled(false);
        } else { 
            var updateButton = form.down('button[action=update]');
            updateButton.setDisabled(true);
        }

        var id = record.data.id;
        Ext.Ajax.request({
            url             : BASE_URL + 'GeneralSetup/c_users/usersOrg',
            method          : 'POST',
            params          : {post : Ext.encode(id)},
            success         : function(response){
                var data    = Ext.JSON.decode(response.responseText);
                var storeComp = Ext.getStore('ERPh.module.GeneralSetup.store.UsersOrganisasi');
                storeComp.removeAll();
                storeComp.add(data.data);
            }
        });
    },

    del: function(gridPanel, selected){
        var me = this;
        me.CheckedDataEdit = new Array();
        var record = gridPanel.up('grid').getSelectionModel().getSelection();
        Ext.each(record, function(selected){
            me.CheckedDataEdit.push({
                id : selected.data.id
            });
        }); 

        Ext.MessageBox.show({
            title           : 'Konfirmasi',
            msg             : 'Anda yakin akan menghapus data yang terseleksi?',
            buttons         : Ext.Msg.YESNO,
            icon            : Ext.MessageBox.WARNING,
            width           : 450,
            fn              : function(btn, evtObj){
                if (btn == 'yes') {
                    Ext.Ajax.request({
                        url             : BASE_URL + 'GeneralSetup/c_users/delUsers',
                        method          : 'POST',
                        params          : {post : Ext.encode(me.CheckedDataEdit)},
                        success         : function(response){
                            var data    = Ext.JSON.decode(response.responseText);
                            // console.log(data.msg);
                            if(data.msg === 1){
                                Ext.MessageBox.show({
                                    title           : 'Informasi',
                                    msg             : 'Data Digunakan di Table Lain',
                                    icon            : Ext.MessageBox.INFO,
                                    buttons         : Ext.MessageBox.OK
                                });                             
                            } else {
                            var storeApproval = Ext.getStore('ERPh.module.GeneralSetup.store.Users');
                            storeApproval.removeAll();
                            storeApproval.add(data.data);
                            }
                        }
                    });
                }
            }
        })
    },

    addorg: function(grid, record, item, index, e, eOpts){
        if(record.data.id_company ===''||record.data.id_company === null){
             Ext.MessageBox.show({
                title           : 'Error',
                msg             : 'Pilih User Terlebih Dahulu',
                icon            : Ext.MessageBox.ERROR,
                buttons         : Ext.MessageBox.OK
            });  
         } else {
            this.getStore('ERPh.module.GeneralSetup.store.Organisasi').load();
            var win = Ext.create('ERPh.module.GeneralSetup.view.form.FormUsersOrganisasi');
            win.show();
            win.down('form').loadRecord(record);
        }
    },

    reset: function(btn) {//Reset Form
        var me = this;
        var form = Ext.getCmp('formusers');
        var grid = Ext.getCmp('gridusersorg');
        form.getForm().reset();

        if(createUsers == false){
            var saveButton = form.down('button[action=save]');
            saveButton.setDisabled(false);
        }else{
            var saveButton = form.down('button[action=save]');
            saveButton.setDisabled(true);
        }

            var updateButton = form.down('button[action=update]');
            updateButton.setDisabled(true);
        me.getStore('ERPh.module.GeneralSetup.store.Users').reload();
        me.getStore('ERPh.module.GeneralSetup.store.Organisasi').reload();
    },
    save: function(btn, evt, opts){
        var me          = this;
        var form        = btn.up('form').getForm();
        var name        = form.findField('name').getValue();
        var firstname   = form.findField('firstname').getValue();
        var role        = form.findField('id_role').getValue();
        var org         = form.findField('value').getValue();
        var lastname    = form.findField('lastname').getValue();
        var username    = form.findField('username').getValue();
        var password    = form.findField('password').getValue();
        var email       = form.findField('email').getValue();
        var phone       = form.findField('phone').getValue();
        var mobile      = form.findField('mobile').getValue();
        var isactive    = form.findField('isactive').getValue();
        var description = form.findField('description').getValue();
        // console.log(role);

        Ext.Ajax.request({
            url     : BASE_URL + 'GeneralSetup/c_users/saveUsers',
            method  : 'POST',
            params  : {
                name        : name,
                firstname   : firstname,
                role        : role,
                org         : org,
                lastname    : lastname,
                username    : username,
                password    : password,
                email       : email,
                phone       : phone,
                mobile      : mobile,
                isactive    : isactive,
                description : description
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
                    me.reset();
                    me.getStore('ERPh.module.GeneralSetup.store.Users').removeAll();
                    me.getStore('ERPh.module.GeneralSetup.store.Users').reload();
                }else if (data.total === 2){
                    Ext.MessageBox.show({
                        title           : 'Error',
                        msg             : 'Username Telah Terdaftar - Silahkan Gunakan Username Lain',
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
    update: function(btn, evt, opts){
        var me          = this;
        var form        = btn.up('form').getForm();
                // console.log(form);
        var id          = form.findField('id').getValue();
        var username    = form.findField('username').getValue();
        var name        = form.findField('name').getValue();
        var firstname   = form.findField('firstname').getValue();
        var role        = form.findField('id_role').getValue();
        var org         = form.findField('value').getValue();
        var lastname    = form.findField('lastname').getValue();
        var description = form.findField('description').getValue();
        var email       = form.findField('email').getValue();
        var phone       = form.findField('phone').getValue();
        var mobile      = form.findField('mobile').getValue();
        var isactive    = form.findField('isactive').getValue();
// console.log(role);
        Ext.MessageBox.show({
            title           : 'Konfirmasi',
            msg             : 'Anda yakin akan merubah data?',
            buttons         : Ext.Msg.YESNO,
            icon            : Ext.MessageBox.WARNING,
            width           : 450,
            fn              : function(btn, evtObj){
                if (btn == 'yes') {
                    Ext.Ajax.request({
                        url     : BASE_URL + 'GeneralSetup/c_users/editUsers',
                        method  : 'POST',
                        params  : {
                            id          : id,
                            username    : username,
                            name        : name,
                            role        : role,
                            org         : org,
                            firstname   : firstname,
                            lastname    : lastname,
                            description : description,
                            email       : email,
                            phone       : phone,
                            mobile      : mobile,
                            isactive    : isactive,
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
                                me.reset();
                                me.getStore('ERPh.module.GeneralSetup.store.Users').removeAll();
                                me.getStore('ERPh.module.GeneralSetup.store.Users').reload();
                            }else if (data.total === 2){
                                Ext.MessageBox.show({
                                    title           : 'Error',
                                    msg             : 'Username Telah Terdaftar - Silahkan Gunakan Username Lain',
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
    search: function(field, evt, opts){
        var value       = field.getValue();
            Ext.Ajax.request({
                url     : BASE_URL + 'GeneralSetup/c_users/searchUsers',
                method  : 'POST',
                params  : {username : value},
                success : function(response){
                    var data    = Ext.JSON.decode(response.responseText);
                    if(data.success){
                            var storeApproval = Ext.getStore('ERPh.module.GeneralSetup.store.Users');
                            storeApproval.removeAll();
                            storeApproval.add(data.data);
                    }
                }
            });
    },
    addusersorg: function(btn, evt, opts){
        // console.log('hai');
        var me          = this;
        var win         = btn.up('window');
        var form        = win.down('form').getForm();        
        var id_users    = form.findField('id_users').getValue();
        var value       = form.findField('value').getValue();
        // console.log(value);
        Ext.Ajax.request({
            url     : BASE_URL + 'GeneralSetup/c_users/saveOrg',
            method  : 'POST',
            params  : {
                id_users    : id_users,
                value       : value
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
                    me.reset();
                    me.getStore('ERPh.module.GeneralSetup.store.Users').removeAll();
                    me.getStore('ERPh.module.GeneralSetup.store.Users').reload();                    
                    me.getStore('ERPh.module.GeneralSetup.store.UsersOrganisasi').removeAll();
                    me.getStore('ERPh.module.GeneralSetup.store.UsersOrganisasi').reload();
                }else if (data.total === 2){
                    Ext.MessageBox.show({
                        title           : 'Error',
                        msg             : 'Pilih User Terlebih Dahulu',
                        icon            : Ext.MessageBox.ERROR,
                        buttons         : Ext.MessageBox.OK
                    });
                }else if (data.total === 3){
                    Ext.MessageBox.show({
                        title           : 'Error',
                        msg             : 'Organisasi Tidak Boleh Kosong',
                        icon            : Ext.MessageBox.ERROR,
                        buttons         : Ext.MessageBox.OK
                    });
                }else if (data.total === 4){
                    Ext.MessageBox.show({
                        title           : 'Error',
                        msg             : 'Organisasi Telah Terdaftar - Silahkan Gunakan Organisasi Lain',
                        icon            : Ext.MessageBox.ERROR,
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

    print : function(){
        window.location = BASE_URL + 'GeneralSetup/c_users/printUsers/';
    },
})

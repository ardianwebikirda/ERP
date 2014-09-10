Ext.define('ERPh.module.GeneralSetup.controller.Role', {
    extend  : 'Ext.app.Controller',
    CheckedDataEdit: [],

    init: function() {
        var me = this;
        me.getStore('ERPh.module.GeneralSetup.store.RoleMenu').load();
        me.control({
            "#gridrole"                             : {
               itemclick: me.groupRole
            },
            "gridrole  button[action=delete]"          : {
                click: me.del
            }, 
            "gridrole  button[action=add]"             : {
                click: me.add
            }, 
            "formrole  button[action=save]"        : {
                click: me.save
            }, 
            "formrole  button[action=reset]"       : {
                click: me.reset
            },
            "gridrole"                             : {
               itemdblclick: me.edit
            },
            "gridrole textfield[action=search]"    : {
               keypress: me.search
            },
            "gridrole button[action=print]"        : {
               click: me.print
            },
            "editrole button[action=update]"       : {
               click: me.update
            }, 
            "gridrolemenu"             : {
                itemdblclick: me.addRole
            },
            "formrolemenu  button[action=save]"        : {
                click: me.saveRole
            },  
        });
        me.callParent(arguments);
    },

    reloadStore: function(){
        var me = this;
        me.getStore('ERPh.module.GeneralSetup.store.Role').reload();
    },
    groupRole: function(me, record, item, index, e, eOpts) {//Edit
        var id = record.data.id;
            Ext.Ajax.request({
                url             : BASE_URL + 'GeneralSetup/c_role/getMenu',
                method          : 'POST',
                params          : {post : Ext.encode(id)},
                success         : function(response){
                    var data    = Ext.JSON.decode(response.responseText);
                    var storeMenu = Ext.getStore('ERPh.module.GeneralSetup.store.RoleMenu');
                    storeMenu.removeAll();
                    storeMenu.add(data.data);
                }
            });
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
                if (btn == 'yes') {
                    Ext.Ajax.request({
                        url             : BASE_URL + 'GeneralSetup/c_role/delRole',
                        method          : 'POST',
                        params          : {post : Ext.encode(me.CheckedDataEdit)},
                        success         : function(response){
                            var data    = Ext.JSON.decode(response.responseText);
                            // console.log(data);
                            if(data.msg === 1)
                            {
                                Ext.MessageBox.show({
                                    title           : 'Informasi',
                                    msg             : 'Data Dipakai di Menu Lain',
                                    icon            : Ext.MessageBox.INFO,
                                    buttons         : Ext.MessageBox.OK
                                });                                
                            } else {
                                var storeApproval = Ext.getStore('ERPh.module.GeneralSetup.store.Role');
                                storeApproval.removeAll();
                                storeApproval.add(data.data);
                            }
                        }
                    });
                }
            }
        })
    },
    add: function(){
        Ext.create('ERPh.module.GeneralSetup.view.form.FormRole').show();
    },
    reset: function(btn) {//Reset Form
        var win         = btn.up('window');
        var form        = win.down('form');
        form.getForm().reset();
        // btn.setDisabled(true);
    },
    save: function(btn, evt, opts){
        var me          = this;
        var win         = btn.up('window');
        var form        = win.down('form').getForm();
        var name        = form.findField('name').getValue();
        var isactive    = form.findField('isactive').getValue();
        var description = form.findField('description').getValue();

        Ext.Ajax.request({
            url     : BASE_URL + 'GeneralSetup/c_role/saveRole',
            method  : 'POST',
            params  : {
                name        : name,
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
                    win.close();
                    me.getStore('ERPh.module.GeneralSetup.store.Role').removeAll();
                    me.getStore('ERPh.module.GeneralSetup.store.Role').reload();
                }else if (data.total === 2){
                    Ext.MessageBox.show({
                        title           : 'Error',
                        msg             : 'Role Telah Terdaftar - Silahkan Gunakan Role Lain',
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
    edit: function(grid, record, item, index, e, eOpts){
        var win = Ext.create('ERPh.module.GeneralSetup.view.form.EditRole');
        win.show();
        win.down('form').loadRecord(record);
    },
    update: function(btn){
        // console.log('hai');
        var me          = this;
        var win         = btn.up('window');
        var form        = win.down('form').getForm();
        var id          = form.findField('id').getValue();
        var name        = form.findField('name').getValue();
        var description = form.findField('description').getValue();
        var isactive    = form.findField('isactive').getValue();
        Ext.MessageBox.show({
            title           : 'Konfirmasi',
            msg             : 'Anda yakin akan merubah data?',
            buttons         : Ext.Msg.YESNO,
            icon            : Ext.MessageBox.WARNING,
            width           : 450,
            fn              : function(btn, evtObj){
                if (btn == 'yes') {
                    Ext.Ajax.request({
                        url     : BASE_URL + 'GeneralSetup/c_role/editRole',
                        method  : 'POST',
                        params  : {
                            id          : id,
                            name        : name,
                            description : description,
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
                                win.close();
                                me.getStore('ERPh.module.GeneralSetup.store.Role').removeAll();
                                me.getStore('ERPh.module.GeneralSetup.store.Role').reload();
                            }else if (data.total === 2){
                                Ext.MessageBox.show({
                                    title           : 'Error',
                                    msg             : 'Role Telah Terdaftar - Silahkan Gunakan Role Lain',
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
                url     : BASE_URL + 'GeneralSetup/c_role/searchRole',
                method  : 'POST',
                params  : {name : value},
                success : function(response){
                    var data    = Ext.JSON.decode(response.responseText);
                    if(data.success){
                            var storeApproval = Ext.getStore('ERPh.module.GeneralSetup.store.Role');
                            storeApproval.removeAll();
                            storeApproval.add(data.data);
                    }
                }
            });
    },
    print : function(){
        window.location = BASE_URL + 'GeneralSetup/c_role/printRole/';
    },

    addRole: function(grid, record, item, index, e, eOpts){
        // console.log(record);
        if(record.data.idrole === '' || record.data.idrole === null)
        {
            Ext.MessageBox.show({
                title           : 'Error',
                msg             : 'Pilih Role Terlebih Dahulu',
                icon            : Ext.MessageBox.ERROR,
                buttons         : Ext.MessageBox.OK
            });  
        } else {
            this.getStore('ERPh.module.GeneralSetup.store.ViewAllMenu').load();      
            var win = Ext.create('ERPh.module.GeneralSetup.view.form.FormRoleMenu');
            win.show();
            win.down('form').loadRecord(record);
        }
    },
    saveRole: function(btn, evt, opts){
        var me          = this;
        var win         = btn.up('window');
        var form        = win.down('form').getForm();
        var idrole      = form.findField('idrole').getValue();
        var id          = form.findField('parent').getValue();
        var isactive    = form.findField('isactive').getValue();
        var iscreate    = form.findField('iscreate').getValue();
        var isupdate    = form.findField('isupdate').getValue();
        var isdelete    = form.findField('isdelete').getValue();
        var isprocess   = form.findField('isprocess').getValue();

        Ext.Ajax.request({
            url     : BASE_URL + 'GeneralSetup/c_role/saveRoleMenu',
            method  : 'POST',
            params  : {
                idrole      : idrole,
                id          : id,
                isactive    : isactive,
                iscreate    : iscreate,
                isupdate    : isupdate,
                isdelete    : isdelete,
                isprocess   : isprocess
            },
            success : function(response){
                var data    = Ext.JSON.decode(response.responseText);
                // console.log(data.data);
                if(data.total === 0){
                    Ext.MessageBox.show({
                        title           : 'Informasi',
                        msg             : 'Data Telah Tersimpan',
                        icon            : Ext.MessageBox.INFO,
                        buttons         : Ext.MessageBox.OK
                    });
                    win.close();
                    var storeMenu = Ext.getStore('ERPh.module.GeneralSetup.store.RoleMenu');
                    storeMenu.removeAll();
                    storeMenu.add(data.data);
                }else if (data.total === 1){
                    Ext.MessageBox.show({
                        title           : 'Error',
                        msg             : 'Pilih Role Terlebih Dahulu',
                        icon            : Ext.MessageBox.ERROR,
                        buttons         : Ext.MessageBox.OK
                    });
                }else if (data.total === 2){
                    Ext.MessageBox.show({
                        title           : 'Error',
                        msg             : 'Pilih Menu Terlebih Dahulu',
                        icon            : Ext.MessageBox.ERROR,
                        buttons         : Ext.MessageBox.OK
                    });
                }else if (data.total === 3){
                    Ext.MessageBox.show({
                        title           : 'Error',
                        msg             : 'Role Telah Terdaftar Ada',
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
})
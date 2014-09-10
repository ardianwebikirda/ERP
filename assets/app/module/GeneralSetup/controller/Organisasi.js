Ext.define('ERPh.module.GeneralSetup.controller.Organisasi', {
    extend  : 'Ext.app.Controller',
    CheckedDataEdit: [],

    init: function() {
        var me = this;
        me.control({
            "gridorganisasi  button[action=delete]"          : {
                click: me.del
            }, 
            "Organisasi  button[action=add]"             : {
                click: me.add
            }, 
            "formorganisasi  button[action=save]"        : {
                click: me.save
            }, 
            "formorganisasi  button[action=reset]"        : {
                click: me.reset
            },
            "gridorganisasi"                             : {
               itemdblclick: me.edit
            },
            "gridorganisasi textfield[action=search]"    : {
               keypress: me.search
            },
            "gridorganisasi button[action=print]"        : {
               click: me.print
            },
            "editorganisasi button[action=update]"        : {
               click: me.update
            }
        });
        me.callParent(arguments);
    },
    reloadStore: function(){
        var me = this;
        me.getStore('ERPh.module.GeneralSetup.store.Organisasi').reload();
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
                        url             : BASE_URL + 'GeneralSetup/c_organisasi/delOrganisasi',
                        method          : 'POST',
                        params          : {post : Ext.encode(me.CheckedDataEdit)},
                        success         : function(response){
                            var data    = Ext.JSON.decode(response.responseText);
                            // console.log(data);
                            if(data.msg === 1){
                                Ext.MessageBox.show({
                                    title           : 'Informasi',
                                    msg             : 'Data Digunakan di Table Lain',
                                    icon            : Ext.MessageBox.INFO,
                                    buttons         : Ext.MessageBox.OK
                                });                             
                            } else {
                                var storeApproval = Ext.getStore('ERPh.module.GeneralSetup.store.Organisasi');
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
        var me = this;
        me.getStore('ERPh.module.GeneralSetup.store.ViewOrganisasi').reload();
        Ext.create('ERPh.module.GeneralSetup.view.form.FormOrganisasi').show();
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
        var value       = form.findField('value').getValue();
        var name        = form.findField('name').getValue();
        var parent      = form.findField('parent').getValue();
        var isactive    = form.findField('isactive').getValue();
        var description = form.findField('description').getValue();

        Ext.Ajax.request({
            url     : BASE_URL + 'GeneralSetup/c_organisasi/saveOrganisasi',
            method  : 'POST',
            params  : {
                value       : value,
                name        : name,
                parent      : parent,
                isactive    : isactive,
                description : description
            },
            success : function(response){
                var data    = Ext.JSON.decode(response.responseText);
                // console.log(data.total);
                if(data.total === 0){
                    Ext.MessageBox.show({
                        title           : 'Informasi',
                        msg             : 'Data Telah Tersimpan',
                        icon            : Ext.MessageBox.INFO,
                        buttons         : Ext.MessageBox.OK
                    });
                    win.close();
                    me.getStore('ERPh.module.GeneralSetup.store.Organisasi').removeAll();
                    me.getStore('ERPh.module.GeneralSetup.store.Organisasi').reload();
                }else if (data.total === 1){
                    Ext.MessageBox.show({
                        title           : 'Error',
                        msg             : 'Kode Tidak Boleh Kosong',
                        icon            : Ext.MessageBox.ERROR,
                        buttons         : Ext.MessageBox.OK
                    });
                }else if (data.total === 2){
                    Ext.MessageBox.show({
                        title           : 'Error',
                        msg             : 'Nama Organisasi Tidak Boleh Kosong',
                        icon            : Ext.MessageBox.ERROR,
                        buttons         : Ext.MessageBox.OK
                    });
                }else if (data.total === 3){
                    Ext.MessageBox.show({
                        title           : 'Error',
                        msg             : 'Parent Organisasi Tidak Boleh Kosong',
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
        this.getStore('ERPh.module.GeneralSetup.store.ViewOrganisasi').reload();
        var win = Ext.create('ERPh.module.GeneralSetup.view.form.EditOrganisasi');
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
        var value       = form.findField('value_asli').getValue();
        var parent      = form.findField('parent').getValue();
        var isactive    = form.findField('isactive').getValue();
        var description = form.findField('description').getValue();
        // console.log(parent);

        Ext.MessageBox.show({
            title           : 'Konfirmasi',
            msg             : 'Anda yakin akan merubah data?',
            buttons         : Ext.Msg.YESNO,
            icon            : Ext.MessageBox.WARNING,
            width           : 450,
            fn              : function(btn, evtObj){
                if (btn == 'yes') {
                    Ext.Ajax.request({
                        url     : BASE_URL + 'GeneralSetup/c_organisasi/editOrganisasi',
                        method  : 'POST',
                        params  : {
                            id          : id,
                            value       : value,
                            name        : name,
                            parent      : parent,
                            description : description,
                            isactive    : isactive,
                        },
                        success : function(response){
                            var data    = Ext.JSON.decode(response.responseText);
                            // console.log(data.total);
                            if(data.total === 0){
                                Ext.MessageBox.show({
                                    title           : 'Informasi',
                                    msg             : 'Data Telah Tersimpan',
                                    icon            : Ext.MessageBox.INFO,
                                    buttons         : Ext.MessageBox.OK
                                });
                                win.close();
                                me.getStore('ERPh.module.GeneralSetup.store.Organisasi').removeAll();
                                me.getStore('ERPh.module.GeneralSetup.store.Organisasi').reload();
                            }else if (data.total === 1){
                                Ext.MessageBox.show({
                                    title           : 'Error',
                                    msg             : 'Kode Organisasi Tidak Boleh Kosong',
                                    icon            : Ext.MessageBox.ERROR,
                                    buttons         : Ext.MessageBox.OK
                                });
                            }else if (data.total === 2){
                                Ext.MessageBox.show({
                                    title           : 'Error',
                                    msg             : 'Nama Organisasi Tidak Boleh Kosong',
                                    icon            : Ext.MessageBox.ERROR,
                                    buttons         : Ext.MessageBox.OK
                                });
                            }else if (data.total === 3){
                                Ext.MessageBox.show({
                                    title           : 'Error',
                                    msg             : 'Parent Tidak Boleh Kosong',
                                    icon            : Ext.MessageBox.ERROR,
                                    buttons         : Ext.MessageBox.OK
                                });
                            }else if (data.total === 4){
                                Ext.MessageBox.show({
                                    title           : 'Error',
                                    msg             : 'Child Organniasi Telah Dipakai',
                                    icon            : Ext.MessageBox.ERROR,
                                    buttons         : Ext.MessageBox.OK
                                });
                            }else {                   
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
                url     : BASE_URL + 'GeneralSetup/c_organisasi/searchOrganisasi',
                method  : 'POST',
                params  : {username : value},
                success : function(response){
                    var data    = Ext.JSON.decode(response.responseText);
                    if(data.success){
                            var storeApproval = Ext.getStore('ERPh.module.GeneralSetup.store.Organisasi');
                            storeApproval.removeAll();
                            storeApproval.add(data.data);
                    }
                }
            });
    },
    print : function(){
        window.location = BASE_URL + 'GeneralSetup/c_organisasi/printOrganisasi/';
    },
})

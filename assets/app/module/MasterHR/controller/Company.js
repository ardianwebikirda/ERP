Ext.define('ERPh.module.MasterHR.controller.Company', {
    extend  : 'Ext.app.Controller',
    CheckedDataEdit: [],
    

    init: function() {
        var me = this;
        me.getStore('ERPh.module.MasterHR.store.Company').load();
        me.getStore('ERPh.module.MasterHR.store.Department2').load();
        me.control({
            "#gridcompany"                          : {
               itemclick: me.groupCompany
            },
            "gridcompany  button[action=delete]"    : {
                click: me.del
            },  
            "gridcompany textfield[action=search]"  : {
               keypress: me.search
            },
            "gridcompany button[action=print]"      : {
               click: me.print
            }, 
            "formcompany  button[action=save]"      : {
                click: me.save
            },
            "formcompany button[action=update]"     : {
               click: me.update
            }, 
            "formcompany  button[action=reset]"     : {
                click: me.reset
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
        me.getStore('ERPh.module.MasterHR.store.Company').reload();
        // me.getStore('ERPh.module.MasterHR.store.Department2').reload();
    },
    groupCompany: function(grid, record, item, index, e, eOpts) {//Edit
        var form = Ext.getCmp('formcompany');
        var grid = Ext.getCmp('griddepartment2');
        form.getForm().setValues(record.data);
        var saveButton = form.down('button[action=save]');
        saveButton.setDisabled(true);

        var updateButton = form.down('button[action=update]');
        updateButton.setDisabled(false);


        var deleteButton = grid.down('button[action=delete]');
        deleteButton.setDisabled(false);

        var id = record.data.id;
        Ext.Ajax.request({
            url             : BASE_URL + 'MasterHR/c_company/getDepartment2',
            method          : 'POST',
            params          : {post : Ext.encode(id)},
            success         : function(response){
                var data        = Ext.JSON.decode(response.responseText);
                var storeComp   = Ext.getStore('ERPh.module.MasterHR.store.Department2');
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
                        url             : BASE_URL + 'MasterHR/c_company/delCompany',
                        method          : 'POST',
                        params          : {post : Ext.encode(me.CheckedDataEdit)},
                        success         : function(response){
                            var data    = Ext.JSON.decode(response.responseText);
                            // console.log(data);
                            me.reset();
                            var storeApproval = Ext.getStore('ERPh.module.MasterHR.store.Company');
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
                url     : BASE_URL + 'MasterHR/c_company/searchCompany',
                method  : 'POST',
                params  : {name : value},
                success : function(response){
                    var data    = Ext.JSON.decode(response.responseText);
                    if(data.success){
                            var storeApproval = Ext.getStore('ERPh.module.MasterHR.store.Company');
                            storeApproval.removeAll();
                            storeApproval.add(data.data);
                    }
                }
            });
    },
    print : function(){
        window.location = BASE_URL + 'MasterHR/c_company/printCompany/';
    },
    save: function(btn, evt, opts){
        var me          = this;
        var form        = btn.up('form').getForm();
        var code        = form.findField('code').getValue();
        var name        = form.findField('name').getValue();

        Ext.Ajax.request({
            url     : BASE_URL + 'MasterHR/c_company/saveCompany',
            method  : 'POST',
            params  : {
                code        : code,
                name        : name
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
                    me.getStore('ERPh.module.MasterHR.store.Company').removeAll();
                    me.getStore('ERPh.module.MasterHR.store.Company').reload();
                }else if (data.total === 2){
                    Ext.MessageBox.show({
                        title           : 'Error',
                        msg             : 'Company Telah Terdaftar - Silahkan Gunakan Company Lain',
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
        var me          = this;
        var form        = btn.up('form').getForm();
        var id          = form.findField('id').getValue();
        var code        = form.findField('code').getValue();
        var name        = form.findField('name').getValue();
        console.log(id);
        Ext.MessageBox.show({
            title           : 'Konfirmasi',
            msg             : 'Anda yakin akan merubah data?',
            buttons         : Ext.Msg.YESNO,
            icon            : Ext.MessageBox.WARNING,
            width           : 450,
            fn              : function(btn, evtObj){
                if (btn == 'yes') {
                    Ext.Ajax.request({
                        url     : BASE_URL + 'MasterHR/c_company/editCompany',
                        method  : 'POST',
                        params  : {
                            id          : id,
                            code        : code,
                            name        : name
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
                                me.getStore('ERPh.module.MasterHR.store.Company').removeAll();
                                me.getStore('ERPh.module.MasterHR.store.Company').reload();
                            }else if (data.total === 2){
                                Ext.MessageBox.show({
                                    title           : 'Error',
                                    msg             : 'Company Telah Terdaftar - Silahkan Gunakan Company Lain',
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
        var form        = Ext.getCmp('formcompany');
        var grid = Ext.getCmp('griddepartment2');
        form.getForm().reset();

        var saveButton = form.down('button[action=save]');
        saveButton.setDisabled(false);

        var updateButton = form.down('button[action=update]');
        updateButton.setDisabled(true);

        var me = this;
        me.getStore('ERPh.module.MasterHR.store.Company').reload();
        me.getStore('ERPh.module.MasterHR.store.Department2').reload();
    },
    addDepartment2: function(grid, record, item, index, e, eOpts){
        if(record.data.id_company ===''||record.data.id_company === null){
             Ext.MessageBox.show({
                title           : 'Error',
                msg             : 'Pilih Company Terlebih Dahulu',
                icon            : Ext.MessageBox.ERROR,
                buttons         : Ext.MessageBox.OK
            });  
         } else {
            // this.getStore('ERPh.module.MasterHR.store.Company').load();
            var win = Ext.create('ERPh.module.MasterHR.view.form.FormDepartment2');
            win.show();
            win.down('form').loadRecord(record);
        }
    },
    saveDept: function(btn, evt, opts){
        var me      = this;
        var win     = btn.up('window');
        var form    = win.down('form').getForm();
        var id_dept = form.findField('name').getValue();
        var id_comp = form.findField('id_company').getValue();

        console.log(id_comp);

        Ext.Ajax.request({
            url     : BASE_URL + 'MasterHR/c_company/saveDepartment2',
            method  : 'POST',
            params  : {
                id_dept     : id_dept,
                id_comp     : id_comp
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
                    me.getStore('ERPh.module.MasterHR.store.Company').reload();
                    me.getStore('ERPh.module.MasterHR.store.Department2').reload();
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
                        url             : BASE_URL + 'MasterHR/c_company/delDepartment',
                        method          : 'POST',
                        params          : {post : Ext.encode(me.CheckedDataEdit)},
                        success         : function(response){
                            var data    = Ext.JSON.decode(response.responseText);
                            me.reset();
                            var storeApproval = Ext.getStore('ERPh.module.MasterHR.store.Department2');
                            storeApproval.removeAll();
                            storeApproval.add(data.data);
                        }
                    });
                }
            }
        });
    }
})
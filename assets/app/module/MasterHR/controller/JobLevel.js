Ext.define('ERPh.module.MasterHR.controller.JobLevel',{
	extend 			: 'Ext.app.Controller',
	CheckedDataEdit	: [],

	init: function() {
        var me = this;
        me.getStore('ERPh.module.MasterHR.store.JobLevel').load();
        me.control({
            "gridjoblevel  button[action=delete]"      : {
                click: me.del
            }, 
            "#gridjoblevel"                            : {
               itemclick: me.viewJobLevel
            },            
            "formjoblevel  button[action=save]"        : {
                click: me.save
            }, 
            "formjoblevel  button[action=reset]"       : {
                click: me.reset
            },
            "gridjoblevel"                             : {
               itemdblclick: me.addorg
            },
            "gridjoblevel textfield[action=search]"    : {
               keypress: me.search
            },
            "gridjoblevel button[action=print]"        : {
               click: me.print
            },
            "formjoblevel button[action=update]"       : {
               click: me.update
            }
        });
        me.callParent(arguments);
    },
    
    reloadStore: function(){
        var me = this;
        me.getStore('ERPh.module.MasterHR.store.JobLevel').reload();
    },

    viewJobLevel: function(grid, record, item, index, e, eOpts){
        this.getStore('ERPh.module.MasterHR.store.JobLevel').reload();
        var id      = record.data.id;
        var form    = Ext.getCmp('formjoblevel');
        var grid    = Ext.getCmp('gridjoblevel');
        form.getForm().setValues(record.data);

        // console.log(record.data);

        var saveButton      = form.down('button[action=save]');
        var updateButton    = form.down('button[action=update]');
        saveButton.setDisabled(true);
        updateButton.setDisabled(false);
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
                        url             : BASE_URL + 'MasterHR/c_joblevel/delJobLevel',
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
                            me.reset();
                            var storeApproval = Ext.getStore('ERPh.module.MasterHR.store.JobLevel');
                            storeApproval.removeAll();
                            storeApproval.add(data.data);
                            }
                        }
                    });
                }
            }
        })
    },

    reset: function(btn) {//Reset Form
        var me = this;
        var form = Ext.getCmp('formjoblevel');
        var grid = Ext.getCmp('gridjoblevel');
        form.getForm().reset();

        if(createJobLevel == false){
            var saveButton = form.down('button[action=save]');
            saveButton.setDisabled(false);
        }else{
            var saveButton = form.down('button[action=save]');
            saveButton.setDisabled(true);
        }

        var updateButton = form.down('button[action=update]');
        updateButton.setDisabled(true);
        me.getStore('ERPh.module.MasterHR.store.JobLevel').reload();
    },

    save: function(btn, evt, opts){
        var me          = this;
        var form        = btn.up('form').getForm();
        var name        = form.findField('name').getValue();
        var level       = form.findField('level').getValue();

        Ext.Ajax.request({
            url     : BASE_URL + 'MasterHR/c_joblevel/saveJobLevel',
            method  : 'POST',
            params  : {
                name        : name,
                level       : level
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
                    me.getStore('ERPh.module.MasterHR.store.JobLevel').removeAll();
                    me.getStore('ERPh.module.MasterHR.store.JobLevel').reload();
                }else if (data.total === 2){
                    Ext.MessageBox.show({
                        title           : 'Error',
                        msg             : 'JobLevel Telah Terdaftar - Silahkan Gunakan JobLevel Lain',
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

    update: function(btn, evt, opts){
        var me          = this;
        var form        = btn.up('form').getForm();
        var id          = form.findField('id').getValue();
        var name        = form.findField('name').getValue();
        var level       = form.findField('level').getValue();
        
        Ext.MessageBox.show({
            title           : 'Konfirmasi',
            msg             : 'Anda yakin akan merubah data?',
            buttons         : Ext.Msg.YESNO,
            icon            : Ext.MessageBox.WARNING,
            width           : 450,
            fn              : function(btn, evtObj){
                if (btn == 'yes') {
                    Ext.Ajax.request({
                        url     : BASE_URL + 'MasterHR/c_joblevel/editJobLevel',
                        method  : 'POST',
                        params  : {
                            id          : id,
                            name        : name,
                            level       : level
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
                                me.getStore('ERPh.module.MasterHR.store.JobLevel').removeAll();
                                me.getStore('ERPh.module.MasterHR.store.JobLevel').reload();
                            }else if (data.total === 2){
                                Ext.MessageBox.show({
                                    title           : 'Error',
                                    msg             : 'JobLevel Telah Terdaftar - Silahkan Gunakan JobLevel Lain',
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
                url     : BASE_URL + 'MasterHR/c_joblevel/searchJobLevel',
                method  : 'POST',
                params  : {name : value},
                success : function(response){
                    var data    = Ext.JSON.decode(response.responseText);
                    if(data.success){
                            var storeApproval = Ext.getStore('ERPh.module.MasterHR.store.JobLevel');
                            storeApproval.removeAll();
                            storeApproval.add(data.data);
                    }
                }
            });
    },

    print : function(){
        window.location = BASE_URL + 'MasterHR/c_joblevel/printJobLevel/';
    },
});
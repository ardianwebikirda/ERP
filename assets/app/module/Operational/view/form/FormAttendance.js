var reason = Ext.create('Ext.data.Store',{
	fields 	: ['id','name'],
	data 	: [
		{'id':'IN','name':'IN'},
		{'id':'OFF','name':'OFF'},
		{'id':'SKIP','name':'SKIP'},
		{'id':'SICK','name':'SICK'},
		{'id':'PERMIT','name':'PERMIT'}
	]
});

Ext.define('ERPh.module.Operational.view.form.FormAttendance',{
	extend		: 'Ext.form.Panel',
	title 		: 'Attendance Detail',
	alias 		: 'widget.formattendance',
	id 			: 'formattendance',
	frame 		: true,
	tbar    : [
        {
            text    : 'Save',
            iconCls : 'icon-disk',
            action  : 'save'//Nantinya akan dicontrol menggunakan controller
        },
        {
            text    : 'Reset',
            iconCls : 'icon-error',
            action  : 'reset'
        }
    ],
	items 		: [
		{
			xtype 			: 'fieldset',
			title 			: 'Attendance Information',
			collapsible 	: true,
			defaults 		: {
				anchor 		: '100%'
			},
			items 			: [
				{
					xtype 		: 'fieldcontainer',
					layout 		: 'hbox',
					defaults	: {
						labelWidth	: 85,
						padding 	: '3px',
						flex 		: 1
					},
					items 			: [
						{
							xtype 		: 'datefield',
							name 		: 'date',
							fieldLabel	: 'Date',
							emptyText 	: 'Select Date Attendance',
							margin 		: '2px 20px 2px 2px',
							msgTarget	: 'under'
						},
						{
                            xtype       : 'checkbox',
                            name        : 'absence',
                            id        	: 'absence',
                            dataIndex   : 'absence',
                            fieldLabel  : 'Absence',
                            anchor      : '98%',
    						labelWidth	: 50,
                            inputValue  : 'absence'
                        }
					]
				},
				{
					xtype 		: 'fieldcontainer',
					layout 		: 'hbox',
					defaults	: {
						labelWidth 	: 85,
						padding 	: '3px',
						flex 		: 1
					},
					items 			: [
						{
							xtype 		: 'timefield',
							name 		: 'time_in',
							fieldLabel 	: 'Time In',
							emptyText 	: 'Select Time In',
							format      : 'H:i',
	                        increment   : 30,
	                        minValue    : '05:00 AM',
	                        maxValue    : '11:00 PM',
	                        formatValue : 'H:i:s',
	     					margin 		: '2px 20px 2px 2px',
	                        anchor     	: '100%'
						},
						{
							xtype 		: 'timefield',
							name 		: 'time_out',
							fieldLabel 	: 'Time Out',
							emptyText 	: 'Select Time Out',
							format      : 'H:i',
	                        increment   : 30,
	                        minValue    : '05:00 AM',
	                        maxValue    : '11:00 PM',
	                        formatValue : 'H:i:s',
	                        anchor     : '100%'
						}
					]
				},
				{
					xtype 		: 'fieldcontainer',
					layout 		: 'hbox',
					defaults	: {
						labelWidth 	: 85,
						padding 	: '3px',
						flex 		: 1
					},
					items 			: [
						{
							xtype 			: 'combobox',
							fieldLabel 		: 'Reason',
							emptyText 		: 'Select Remark',
							name 			: 'reason',
							store 			: reason,
							queryMode 		: 'local',
							displayField	: 'name',
	     					anchor 			: '100%',
	     					margin 			: '2px 35px 2px 2px',
							valueField 		: 'id'
						},
						{
							xtype			: 'textfield',
							fieldLabel 		: 'Description',
							name 			: 'desc',
	     					margin 			: '2px 20px 2px 2px',
	     					anchor 			: '100%',
							emptyText 		: 'Description'
						}
					]
				}
			]
		}		
	] 
});
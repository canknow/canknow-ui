## Form

:::demo

```html
<template>
    <c-form label-width="150" :rules="rules" :model="model" ref="form">
        <c-form-item label="name" prop="name">
            <c-input v-model="model.name" block placeholder="项目名称支持 1~31 位的中英文、数字、下划线(_)、中划线(-)、点(.)和空格的组合"></c-input>
        </c-form-item>
        <c-form-item label="content" prop="content">
            <c-rich-editor v-model="model.content" placeholder="项目名称支持 1~31 位的中英文、数字、下划线(_)、中划线(-)、点(.)和空格的组合"></c-rich-editor>
        </c-form-item>
        <c-form-item label="field2">
            <c-input custom-prepend block placeholder="项目名称支持 1~31 位的中英文、数字、下划线(_)、中划线(-)、点(.)和空格的组合">
                <c-button scene="primary" slot="prepend">https://dev.tencent.com/u/canknow/p/</c-button>
            </c-input>
        </c-form-item>
        <c-form-item label="field3" prop="date">
            <c-date-picker style="width: 200px" v-model="model.date" placeholder="请选择日期"></c-date-picker>
        </c-form-item>
        <c-form-item label="field3">
            <c-date-picker v-model="model.range" type="daterange" placeholder="请选择日期范围"></c-date-picker>
        </c-form-item>
        <c-form-item label="field3">
            <c-input type="textarea" block></c-input>
        </c-form-item>
        <c-form-item label="field3">
            <c-input-number></c-input-number>
        </c-form-item>
        <c-form-item label="field4">
            <c-switch></c-switch>
        </c-form-item>
        <c-form-item label=" ">
            <c-button scene="primary" icon="save" @click="submitForm">Submit</c-button>
            <c-button border @click="reset">Reset</c-button>
        </c-form-item>
    </c-form>
</template>
<script>
export default {
    data () {
        return {
            model: {
                name: '',
                content: '',
                range: '',
                date: null
            },
            rules: {
                name: [
                    { required: true, message: '请输入活动名称', trigger: 'blur' },
                ],
                content: [
                    { required: true, message: '请输入内容' },
                ],
                date: [
                    { required: true, message: '请输入内容' },
                ]
            }
        };
    },
    methods: {
        submitForm() {
            this.$refs.form.validate((valid) => {
                if (valid) {
                    alert('submit!');
                }
                else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        reset () {
            this.$refs.form.resetFields();
        }
    }
};
</script>
```
:::

:::demo

```html
<template>
    <c-form type="inline">
        <c-form-item label="field1">
            <c-input clearable block placeholder="项目名称支持 1~31 位的中英文、数字、下划线(_)、中划线(-)、点(.)和空格的组合"></c-input>
        </c-form-item>
        <c-form-item label="field2">
            <c-switch></c-switch>
        </c-form-item>
        <c-form-item label="field2">
            <c-checkbox></c-checkbox>
        </c-form-item>
        <c-form-item label="field3">
            <c-input clearable block placeholder="项目名称支持 1~31 位的中英文、数字、下划线(_)、中划线(-)、点(.)和空格的组合"></c-input>
        </c-form-item>
        <c-form-item label="field4">
            <c-input clearable block placeholder="项目名称支持 1~31 位的中英文、数字、下划线(_)、中划线(-)、点(.)和空格的组合"></c-input>
        </c-form-item>
        <c-form-item label="field5">
            <c-input clearable block placeholder="项目名称支持 1~31 位的中英文、数字、下划线(_)、中划线(-)、点(.)和空格的组合"></c-input>
        </c-form-item>
        <c-form-item label="field6">
            <c-input clearable block placeholder="项目名称支持 1~31 位的中英文、数字、下划线(_)、中划线(-)、点(.)和空格的组合"></c-input>
        </c-form-item>
        <c-form-item label="field7">
            <c-input clearable block placeholder="项目名称支持 1~31 位的中英文、数字、下划线(_)、中划线(-)、点(.)和空格的组合"></c-input>
        </c-form-item>
        <c-button scene="primary" icon="save">Submit</c-button>
    </c-form>
</template>
```
:::

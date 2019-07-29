<template>
  <div>
    <div style="padding-top: 10px;">
      <a-row>
        <a-col :style="{ marginBottom: '24px' }">
          <a-card style="height: 130px" :bordered="false">
            <a-row :gutter="24">
              <a-col :span="16">
                <div style="padding-top:10px">
                  <div style="float:left">
                    <a-avatar
                      :size="64"
                      src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1558452898455&di=080f63ea3ce4f4c4d4aa1e166fc3cf08&imgtype=0&src=http%3A%2F%2Fimg1.cache.netease.com%2Fcatchpic%2FB%2FB5%2FB5BCD0CA7FF9D1511CA505CA5D47D7FE.jpg"
                    />
                  </div>
                  <div style="float:left；margin-left: 20px;position:absolute;left:100px">
                    <h2>早上好！王警官</h2>
                    <div style="color: rgba(0, 0, 0, 0.45);">空间信息作战部队 | 公安部</div>
                  </div>
                </div>
              </a-col>
              <a-col :span="8" style="padding-top:10px">
                <a-row :gutter="16">
                  <a-col :span="8">
                    <a-row>
                      <a-col style="color: rgba(0, 0, 0, 0.45);">管辖区</a-col>
                      <a-col style="color: rgba(0, 0, 0, 0.85);padding-top: 10px;font-size:24px">
                        <div>花山区</div>
                      </a-col>
                    </a-row>
                  </a-col>
                  <a-col :span="8">
                    <a-row>
                      <a-col style="color: rgba(0, 0, 0, 0.45);">录案数</a-col>
                      <a-col style="color: rgba(0, 0, 0, 0.85);font-size:24px;padding-top: 10px;">
                        <div>33</div>
                      </a-col>
                    </a-row>
                  </a-col>
                  <a-col :span="8">
                    <a-row>
                      <a-col style="color: rgba(0, 0, 0, 0.45);">访问量</a-col>
                      <a-col style="color: rgba(0, 0, 0, 0.85);font-size:24px;padding-top: 10px;">
                        <div>236</div>
                      </a-col>
                    </a-row>
                  </a-col>
                </a-row>
              </a-col>
            </a-row>
          </a-card>
        </a-col>
      </a-row>
    </div>
    <a-card :body-style="{padding: '24px 32px'}" :bordered="false">
      <a-form @submit="handleSubmit" :form="form">
        <a-form-item
          label="案件名称"
          :labelCol="{lg: {span: 7}, sm: {span: 7}}"
          :wrapperCol="{lg: {span: 10}, sm: {span: 17} }"
        >
          <a-input
            v-decorator="[
            'name',
            {rules: [{ required: true, message: '请输入案件名称' }]}
          ]"
            name="name"
            placeholder="请输入案件名称"
          />
        </a-form-item>
        <a-form-item
          label="案件日期"
          :labelCol="{lg: {span: 7}, sm: {span: 7}}"
          :wrapperCol="{lg: {span: 10}, sm: {span: 17} }"
        >
          <a-date-picker
            @change="onChange"
            :defaultValue="moment('2019-07-28', dateFormat)"
            v-model="curdate"
          />
        </a-form-item>
        <a-form-item
          label="案件性质"
          :labelCol="{lg: {span: 7}, sm: {span: 7}}"
          :wrapperCol="{lg: {span: 10}, sm: {span: 17} }"
        >
          <a-select
            defaultValue="盗窃案"
            v-decorator="[
          'select',
          {rules: [{ required: true, message: '请选择案件类型' }]}
        ]"
            placeholder="请选择案件类型"
            v-model="Catvalue"
          >
            <a-select-option value="rushiCrime">盗窃案</a-select-option>
            <a-select-option value="otherCrime">其他犯罪</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item
          label="案件描述"
          :labelCol="{lg: {span: 7}, sm: {span: 7}}"
          :wrapperCol="{lg: {span: 10}, sm: {span: 17} }"
        >
          <a-textarea
            rows="4"
            placeholder="请输入案件详细描述"
            v-decorator="[
            'description',
            {rules: [{ required: true, message: '请输入目标描述' }]}
          ]"
          />
        </a-form-item>
        <a-form-item
          label="录入警员"
          :labelCol="{lg: {span: 7}, sm: {span: 7}}"
          :wrapperCol="{lg: {span: 10}, sm: {span: 17} }"
        >
          <a-input
            placeholder="姓名／工号"
            v-decorator="[
            'customer',
            {rules: [{ required: true, message: '警员' }]}
          ]"
          />
        </a-form-item>
        <a-form-item
          label="录入日期"
          :labelCol="{lg: {span: 7}, sm: {span: 7}}"
          :wrapperCol="{lg: {span: 10}, sm: {span: 17} }"
        >
          <a-date-picker
            @change="onChange"
            :defaultValue="moment('2019-07-028', dateFormat)"
            v-model="curdate"
          />
        </a-form-item>
        <a-form-item :wrapperCol="{ span: 24 }" style="text-align: center">
          <a-button htmlType="submit" type="primary">提交</a-button>
          <a-button style="margin-left: 8px">保存</a-button>
        </a-form-item>
      </a-form>
    </a-card>
  </div>
</template>

<script>
import moment from "moment";
export default {
  data() {
    return {};
  },
  methods: {
    moment
  }
};
</script>

<style>
</style>

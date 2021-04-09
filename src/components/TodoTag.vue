<template>
  <ul>
    <li
      v-for="(item, itemIndex) in data.list"
      :key="itemIndex"
      class="content-item"
    >
      <TodoTagPanelTitle
        :type="data.title"
        :data="item"
        :index="itemIndex"
        @toggleEditPanel="handleToggleEditPanel"
        :editPanelOpened="editPanelOpened"
      />
      <EditPanel
        pos="tag-list"
        :tomatoAmount="10"
        v-show="editPanelOpened === `${data.title}-${itemIndex}`"
      >
        <template v-slot:buttons>
          <div class="content-panel-btn-area">
            <!-- <MyButton
              title="DELETE"
              type="secondary"
              :method="toDelete.bind(null, item.id, itemIndex)"
              pos="tag-list"
            />
            <MyButton
              title="SAVE"
              type="primary"
              class="pos-tag-list"
              :method="toSave.bind(null, item.id, itemIndex)"
              v-if="getTagData(nowTag).title === 'TO DO'"
            />
            <MyButton
              title="REDO"
              type="primary"
              class="pos-tag-list"
              :method="toRedo.bind(null, item)"
              v-if="getTagData(nowTag).title === 'DONE'"
            /> -->
          </div>
        </template>
      </EditPanel>
    </li>
  </ul>
</template>

<script>
import TodoTagPanelTitle from './TodoTagPanelTitle';
import EditPanel from './EditPanel';

export default {
  components: {
    TodoTagPanelTitle,
    EditPanel,
  }, 
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      editPanelOpened: null,
    };
  },
  methods: {
    handleToggleEditPanel(index) {
      this.editPanelOpened = this.editPanelOpened !== index ? index : null;
    },
  },
}
</script>
<template>
  <div class="pagination">
    <button @click="prevPage" :disabled="currentPage === 1" class="pagination-btn">Previous</button>
    <span class="pagination-info">Page {{ currentPage }} of {{ totalPages }}</span>
    <button @click="nextPage" :disabled="currentPage === totalPages" class="pagination-btn">Next</button>
  </div>
</template>

<script>
export default {
  props: {
    total: {
      type: Number,
      required: true,
    },
    currentPage: {
      type: Number,
      required: true,
    },
  },
  computed: {
    totalPages() {
      return Math.ceil(this.total / 5);
    },
  },
  methods: {
    prevPage() {
      this.$emit('page-changed', this.currentPage - 1);
    },
    nextPage() {
      this.$emit('page-changed', this.currentPage + 1);
    },
  },
};
</script>

<style scoped>
.pagination {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 20px 0;
}

.pagination-btn {
  background-color: darkblue;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
  margin: 0 10px;
}

.pagination-btn:disabled {
  background-color: lightgray;
  cursor: not-allowed;
}

.pagination-info {
  color: darkblue;
  margin: 0 10px;
}
</style>
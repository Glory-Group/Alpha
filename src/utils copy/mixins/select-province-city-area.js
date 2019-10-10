import model from '@/models'

export default {
  data() {
    return {
      provinces: [],
      citys: null,
      areas: null,
      curConfigData: {
        province: null,
        city: null,
        area: null
      }
    }
  },
  methods: {
    getValueByLabel(label, dataArr) {
      const arr = dataArr.filter(item => item.name === label)
      if (arr.length > 0) {
        return arr[0].id + ''
      }
      return null
    },
    getLabelByValue(value, dataArr) {
      const arr = dataArr.filter(item => item.id === parseInt(value, 10))
      if (arr.length > 0) {
        return arr[0].name
      }
      return null
    },
    isMunicipality(name) {
      return name === '北京' || name === '上海' || name === '天津' || name === '重庆'
    },
    async selectCity(value) {
      if (value) {
        this.curConfigData.city = null
        this.citys = null
        this.curConfigData.area = null
        this.areas = null
        const municipality = this.provinces.find(item => item.id + '' === value)
        if (this.isMunicipality(municipality.name)) {
          this.$set(this, 'citys', [{
            id: municipality.id,
            name: municipality.name
          }])
          this.curConfigData.city = municipality.id + ''
          const resArea = await model.fetchArea(municipality.id)
          if (resArea && resArea.data.isSuccess) {
            this.areas = resArea.data.data
          }
        } else {
          const resCity = await model.fetchArea(value)
          if (resCity && resCity.data.isSuccess) {
            this.$set(this, 'citys', resCity.data.data)
          }
        }
      }
    },
    async selectArea(value) {
      if (value) {
        this.curConfigData.area = null
        this.areas = null
        const resArea = await model.fetchArea(value)
        if (resArea && resArea.data.isSuccess) {
          this.areas = resArea.data.data
        }
      }
    }
  },
  async created() {
    const resProvince = await model.fetchArea(0)
    if (resProvince && resProvince.data.isSuccess) {
      this.provinces = resProvince.data.data
    }
  }
}

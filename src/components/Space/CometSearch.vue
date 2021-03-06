<template>
    <div>
        <div id="divContentHolderCometSearch">
            <Header/>
            <section id="sectionCometSearch">
                <div>
                    <b-row class="contentTitle">
                        <b-img class="imageSection" src="https://raw.githubusercontent.com/christianvajgel/spa_c_assets/master/images/comet_search.png"
                               height="75" width="75" alt="comet search icon section"></b-img>
                        <p class="titleSection">COMET SEARCH</p>
                    </b-row>
                </div>

                <div>
                    <b-form-row id="formInputCometSearch" @submit.prevent="searchComets">
                        <b-col cols="3">
                            <b-form-group label-cols="4" label-cols-lg="2" label-size="sm"
                                             id="firstDate"
                                             label="Start:"
                                             label-for="input_firstDate">
                            <b-form-datepicker id="input_firstDate"
                                               v-model="cometDateStart"
                                               class="mb-2"
                                               size="sm"
                                               required></b-form-datepicker></b-form-group>
                        </b-col>
                        <b-col cols="3">
                            <b-form-group label-cols="4" label-cols-lg="2" label-size="sm"
                                          id="secondDate"
                                          label="End:"
                                          label-for="input_secondDate">
                                <b-form-datepicker id="input_secondDate"
                                                   v-model="cometDateEnd"
                                                   class="mb-2"
                                                   size="sm"
                                                   required></b-form-datepicker></b-form-group>
                        </b-col>
                        <b-col cols="1">
                            <b-button type="submit"
                                      @click="searchComets()"
                                      class="buttonCometSearch"
                                      variant="dark">
                                <b-img id="buttonSubmitCometSearch"
                                       src="https://raw.githubusercontent.com/christianvajgel/spa_c_assets/master/images/magnifier_icon_24px.png"
                                       width="18" height="18" alt="magnifier icon for search comet button"></b-img></b-button>
                        </b-col>
                    </b-form-row>
                </div>

                <div class="container" id="divContainerTableCometSearch">
                    <div class="borderTable">
                        <b-table sticky-header=true id="tableCometSearchSummarized" borderless hover :items="allComets" :fields="fields" :dark="true" responsive=true>
                            <template v-slot:cell(actions)="row">
                                <router-link :to="{ name: 'cometDetail', params: { id: row.item._id } }">
                                    <b-button v-b-popover.hover.top.v-dark="{ content: 'More details' }"
                                              variant="outline-dark" id="buttonInfo" size="sm" class="mr-1">
                                        <b-icon-box-arrow-right></b-icon-box-arrow-right>
                                    </b-button>
                                </router-link>

                                <b-button v-b-popover.hover.top.v-dark="{ content: 'Delete comet' }"
                                          variant="outline-dark" id="buttonDelete" size="sm" @click="deleteComet(row.item._id)" class="mr-1">
                                    <b-icon-trash></b-icon-trash>
                                </b-button>
                            </template>

                            <template v-slot:head(id)="data">
                                <span v-b-popover.hover.top.v-dark="{ content: cometSearchId }">{{ data.label }}</span>
                            </template>

                            <template v-slot:head(name)="data">
                                <span v-b-popover.hover.top.v-dark="{ content: cometSearchName }">{{ data.label }}</span>
                            </template>

                            <template v-slot:head(absoluteMagnitude)="data">
                                <span v-b-popover.hover.top.v-dark="{ content: cometSearchAbsoluteMagnitude }">{{ data.label }}</span>
                            </template>

                            <template v-slot:head(closeApproach)="data">
                                <span v-b-popover.hover.top.v-dark="{ content: cometSearchCloseApproach }">{{ data.label }} <sup>(UTC)</sup></span>
                            </template>

                        </b-table>
                    </div>
                </div>

            </section>
            <Footer/>
        </div>
    </div>
</template>

<script>
    import Header from "@/components/Header";
    import Footer from "@/components/Footer";
    import {mapActions, mapGetters} from "vuex";
    import Glossary from "@/components/Glossary";
    export default {
        name: "CometSearch",
        components: {Footer, Header},
        methods: {
            ...mapActions(["getComets","deleteComet"]),
            searchComets(){
                let dates = Array();
                dates.push(this.cometDateStart);
                dates.push(this.cometDateEnd);
                this.getComets(dates);
            },
        },
        computed:
            mapGetters(["allComets"]),
        data() {
            return {
                cometDateStart:"",
                cometDateEnd:"",
                fields: [
                    {key:'id',sortable: true,label:'ID'},
                    {key:'name',sortable: true},
                    {key:'absoluteMagnitude',sortable: true},
                    {key:'closeApproach',sortable: true},
                    { key: 'actions', label: 'Actions'}
                ],
                cometSearchId:Glossary.methods.data().cometSearchId,
                cometSearchName:Glossary.methods.data().cometSearchName,
                cometSearchAbsoluteMagnitude:Glossary.methods.data().cometSearchAbsoluteMagnitude,
                cometSearchCloseApproach:Glossary.methods.data().cometSearchCloseApproach,
            }
        },
    }
</script>

<style>

    .btn .b-icon.bi, .nav-link .b-icon.bi, .dropdown-toggle .b-icon.bi, .dropdown-item .b-icon.bi, .input-group-text .b-icon.bi {
        font-size: 132% !important;
    }

    #sectionCometSearch {
        margin-bottom: 100px !important
    }

    .bg-b-table-default {
        color: #E2E2E2 !important;
    }

    .borderTable {
        border: 1px solid #343a40;
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    }

    #buttonInfo:hover {
        color:#E2E2E2;
        background-color: #17A2B8;
        border-color: #17A2B8;

    }

    #buttonEdit:hover {
        color:#343A40;
        background-color: #FFC107;
        border-color: #FFC107;
    }

    #buttonDelete:hover {
        color:#E2E2E2;
        background-color: #DC3545;
        border-color: #DC3545;
    }

    .imageSection {
        margin-left: 50px;
    }

    .titleSection {
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: left !important;
        font-size: 30px;
        margin-left: 25px;
        align-self: self-end;
    }

    .contentTitle {
        margin-top: 5px !important;
        margin-left: 25px !important;
    }

    .row {
        margin: 0;
    }

    .form-row  {
        margin: 0;
    }

    .buttonCometSearch {
        margin-left: -40px;
        transform: scale(0.80);
    }

    #buttonSubmitCometSearch {
        margin-top: -6px;
    }

    #formInputCometSearch {
        margin-top: 25px;
        padding: 5px;
        justify-content: center;
        align-items: center;
    }

    #divContentHolderCometSearch {
        position: relative;
    }

    #firstDate {
        margin-top: 10px;
    }

    #secondDate {
        margin-top: 10px;
    }

    #tableCometSearchSummarized {
        color: #E2E2E2;
        background-color: #181818;
    }

    .bg-b-table-default {
        background-color: #181818 !important;
    }

    #divContainerTableCometSearch {
        margin-top: 50px;
    }

    .b-calendar, .b-form-date-calendar, .d-inline-block * {
        background-color: #181818;
        color: #E2E2E2;
    }

    #__BVID__214__calendar-grid_ {
        background-color: #181818;
        color: #E2E2E2;
    }

    /*#__BVID__39__calendar-grid_ {*/
    /*    background-color: #181818 !important;*/
    /*    color: #E2E2E2 !important;*/
    /*}*/

    /*#__BVID__39__calendar-grid-caption_ {*/
    /*    color: #E2E2E2 !important;*/
    /*}*/

    /*#__BVID__39__calendar-value_ {*/
    /*    border: none !important;*/
    /*}*/



    /*#__BVID__43__calendar-value_ {*/
    /*    border: none !important;*/
    /*}*/

    /*#__BVID__43__calendar-grid_ {*/
    /*    background-color: #181818 !important;*/
    /*    color: #E2E2E2 !important;*/
    /*}*/

    /*#__BVID__43__calendar-grid-caption_ {*/
    /*    color: #E2E2E2 !important;*/
    /*}*/

    /*#__BVID__46__calendar-value_ {*/
    /*    border: none !important;*/
    /*}*/

    /*#__BVID__46__calendar-grid_ {*/
    /*    background-color: #181818 !important;*/
    /*    color: #E2E2E2 !important;*/
    /*}*/

    /*#__BVID__46__calendar-grid-caption_ {*/
    /*    color: #E2E2E2 !important;*/
    /*}*/





    /*#__BVID__42__calendar-grid_ {*/
    /*    background-color: #181818 !important;*/
    /*    color: #E2E2E2 !important;*/
    /*}*/

    /*#__BVID__42__calendar-value_ {*/
    /*    border: none !important;*/
    /*}*/

    /*#__BVID__41__calendar-grid-caption_ {*/
    /*    color: #E2E2E2 !important;*/
    /*}*/

    .row, .no-gutters, .border-bottom {
        color: #E2E2E2 !important;
    }

    .bg-light {
        background-color: #181818 !important;
    }

    .small {
        color: #E2E2E2;
    }

    .text-dark {
        color: #E2E2E2 !important;
    }

    .text-muted {
        color: #353535 !important;
    }

    .btn-primary:not(:disabled):not(.disabled):active, .btn-primary:not(:disabled):not(.disabled).active, .show > .btn-primary.dropdown-toggle {
        color: #E2E2E2 !important;
        background-color: #353535;
    }

    .btn-outline-light:hover {
        color: #616161 !important;
        background-color: #E2E2E2 !important;
    }

    .form-control {
        background-color: #E2E2E2;
        line-height: 2.0 !important;
        border: none !important;
    }

    .btn-outline-primary {
        color: #616161 !important;
    }

    .btn-outline-primary:hover {
        color: #616161 !important;
        background-color: #E2E2E2 !important;
        border-color: #E2E2E2 !important;
    }

    .btn-light {
        color: #616161 !important;
        background-color: #E2E2E2 !important;
        border-color: transparent;
    }

    .btn-light:hover {
        color: #616161 !important;
        background-color: #E2E2E2 !important;
        border-color: transparent;
    }

    .dropdown-menu {
        background-color: #181818 !important;
    }

    .btn-outline-secondary {
        color: #616161 !important;
    }

    .btn-outline-secondary:hover {
        background-color: #353535 !important;
    }

    .border-top {
        /*border-top: 1px solid #353535 !important;*/
        border-top: none !important;
        border-bottom: none !important;
    }

    .border-bottom {
        border-bottom: 1px solid #353535 !important;
    }

    #input_firstDate__dialog_ {
        box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
    }

    #input_secondDate__dialog_ {
        box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
    }

    .btn-dark {
        color: #E2E2E2;
        background-color: #181818;
        border-color: #353535;
    }

    .btn-dark:hover {
        color: #E2E2E2;
        background-color: #353535;
        border-color: #353535;
    }

    .btn-outline-dark {
        color: #E2E2E2;
        /*background-color: #181818;*/
        border-color: #353535;
    }

    .btn-outline-dark:hover {
        color: #E2E2E2;
        background-color: #353535;
        border-color: #353535;
    }


</style>
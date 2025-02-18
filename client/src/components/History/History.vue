<template>
    <UrlDataProvider :key="history.id" :url="dataUrl" auto-refresh v-slot="{ loading, result: payload }">
        <ExpandedItems
            :scope-key="history.id"
            :get-item-key="(item) => item.type_id"
            v-slot="{ expandedCount, isExpanded, setExpanded, collapseAll }">
            <SelectedItems
                :scope-key="history.id"
                :get-item-key="(item) => item.type_id"
                v-slot="{
                    selectedItems,
                    showSelection,
                    setShowSelection,
                    selectItems,
                    isSelected,
                    setSelected,
                    resetSelection,
                }">
                <Layout>
                    <template v-slot:globalnav>
                        <slot name="globalnav" :history="history" />
                    </template>

                    <template v-slot:localnav>
                        <HistoryMenu :history="history" v-on="$listeners" />
                    </template>

                    <template v-slot:details>
                        <HistoryDetails :history="history" v-on="$listeners" />
                    </template>

                    <template v-slot:messages>
                        <HistoryMessages class="m-2" :history="history" />
                    </template>

                    <template v-slot:listcontrols>
                        <ContentOperations
                            :history="history"
                            :params.sync="params"
                            :content-selection="selectedItems"
                            :show-selection="showSelection"
                            :expanded-count="expandedCount"
                            :has-matches="hasMatches(payload)"
                            @update:content-selection="selectItems"
                            @update:show-selection="setShowSelection"
                            @reset-selection="resetSelection"
                            @hide-selection="onHiddenItems"
                            @select-all="selectItems(payload)"
                            @collapse-all="collapseAll" />
                    </template>

                    <template v-slot:listing>
                        <HistoryEmpty v-if="payload && payload.length == 0" class="m-2" />
                        <b-alert v-else-if="loading" class="m-2" variant="info" show>
                            <LoadingSpan message="Loading History" />
                        </b-alert>
                        <HistoryListing
                            v-else
                            :query-key="queryKey"
                            :page-size="pageSize"
                            :payload="payload"
                            @scroll="onScroll">
                            <template v-slot:history-item="{ item }">
                                <HistoryContentItem
                                    v-if="!hiddenItems[item.hid]"
                                    :item="item"
                                    :expanded="isExpanded(item)"
                                    :selected="isSelected(item)"
                                    :show-selection="showSelection"
                                    @update:expanded="setExpanded(item, $event)"
                                    @update:selected="setSelected(item, $event)"
                                    @viewCollection="$emit('viewCollection', item)" />
                            </template>
                        </HistoryListing>
                    </template>

                    <template v-slot:modals>
                        <ToolHelpModal />
                    </template>
                </Layout>
            </SelectedItems>
        </ExpandedItems>
    </UrlDataProvider>
</template>

<script>
import { History } from "./model";
import { SearchParams } from "./model/SearchParams";
import LoadingSpan from "components/LoadingSpan";
import { UrlDataProvider } from "components/providers/UrlDataProvider";
import ExpandedItems from "./ExpandedItems";
import SelectedItems from "./SelectedItems";
import Layout from "./Layout";
import HistoryMessages from "./HistoryMessages";
import HistoryDetails from "./HistoryDetails";
import HistoryEmpty from "./HistoryEmpty";
import ContentOperations from "./ContentOperations";
import ToolHelpModal from "./ToolHelpModal";
import HistoryMenu from "./HistoryMenu";
import HistoryListing from "./HistoryListing";
import { HistoryContentItem } from "./ContentItem";

export default {
    components: {
        LoadingSpan,
        UrlDataProvider,
        Layout,
        HistoryContentItem,
        HistoryMessages,
        HistoryDetails,
        HistoryEmpty,
        HistoryMenu,
        HistoryListing,
        ContentOperations,
        ToolHelpModal,
        ExpandedItems,
        SelectedItems,
    },
    props: {
        history: { type: History, required: true },
    },
    data() {
        return {
            hiddenItems: {},
            maxHid: this.history.hid_counter,
            maxNew: 10,
            pageSize: 50,
            params: {},
        };
    },
    watch: {
        queryKey() {
            this.hiddenItems = {};
            this.maxHid = this.history.hid_counter;
        },
    },
    computed: {
        dataUrl() {
            return `api/histories/${this.historyId}/contents/before/${this.maxHid + this.maxNew}/${this.pageSize}?${
                this.queryString
            }`;
        },
        historyId() {
            return this.history.id;
        },
        queryKey() {
            return `${this.history.id}&${this.queryString}`;
        },
        queryString() {
            return new SearchParams(this.params).historyContentQueryString;
        },
    },
    methods: {
        hasMatches(payload) {
            return !!payload && payload.length > 0;
        },
        onScroll(newHid) {
            this.maxHid = newHid;
        },
        onHiddenItems(selectedItems) {
            selectedItems.forEach((item) => {
                this.hiddenItems[item.hid] = true;
            });
        },
    },
};
</script>

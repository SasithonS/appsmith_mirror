import { AppState } from "reducers";
import { createSelector } from "reselect";
import { FlattenedWidgetProps } from "reducers/entityReducers/canvasWidgetsReducer";
import { WidgetProps } from "widgets/BaseWidget";
import { WidgetType } from "constants/WidgetConstants";
export const getWidgets = (
  state: AppState,
): { [widgetId: string]: FlattenedWidgetProps } => {
  return state.entities.canvasWidgets;
};

export const getWidgetsMeta = (state: AppState) => state.entities.meta;

export const getWidget = (state: AppState, widgetId: string): WidgetProps => {
  return state.entities.canvasWidgets[widgetId];
};

export const getEditorConfigs = (
  state: AppState,
): { pageId: string; layoutId: string } | undefined => {
  const pageId = state.entities.pageList.currentPageId;
  const layoutId = state.ui.editor.currentLayoutId;
  if (!pageId || !layoutId) return undefined;
  return { pageId, layoutId };
};

export const getDefaultWidgetConfig = (
  state: AppState,
  type: WidgetType,
): Partial<WidgetProps> => {
  const configs = state.entities.widgetConfig.config;
  const widgetConfig = { ...configs[type] };
  delete widgetConfig.rows;
  delete widgetConfig.columns;
  return widgetConfig;
};

// export const getPageLayoutId = (state: AppState, pageId: string): string => {
//   const { pages } = state.entities.pageList;
//   const page = pages.find(page => page.pageId === pageId);
//   if (!page) {
//     throw Error("Page not found");
//   }
//   return page.layoutId;
// };

//TODO(abhinav): The api will return a default flag in the future. use that
// Also, check out `sagaUtils.ts` this has a getDefaultPageId. when the flag is available
// remove that and use this.
export const getDefaultPageId = (state: AppState, pageId?: string): string => {
  const { pages } = state.entities.pageList;
  const page = pages.find(page => page.pageId === pageId);
  return page ? page.pageId : pages[0].pageId;
};

export const getExistingWidgetNames = createSelector(
  getWidgets,
  (widgets: { [widgetId: string]: FlattenedWidgetProps }) => {
    return Object.values(widgets).map(widget => widget.widgetName);
  },
);

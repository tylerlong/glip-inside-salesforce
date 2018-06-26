({
  doInit : function(component, event, helper) {
      let action = component.get("c.getOpportunityGlipGroupId");
      action.setParams({
          opportunityId: component.get("v.recordId")
      });
      action.setCallback(this, function(response) {
          let glipGroupId = response.getReturnValue();
          component.set("v.glipGroupId", glipGroupId);
      });
      $A.enqueueAction(action);
      
      if(window.receiveMessage !== undefined){
          window.removeEventListener("message", window.receiveMessage, false);
      }
      window.receiveMessage = function(event) {
          if(event.data.type === 'rc-glip-group-changed') {
              let action = component.get("c.setOpportunityGlipGroupId");
              action.setParams({
                  opportunityId: component.get("v.recordId"),
                  glipGroupId: event.data.groupId
              });
              $A.enqueueAction(action);
              console.log('Saving Glip Group', event.data.groupId)
          }
      }
      window.addEventListener("message", receiveMessage, false);
  }
})

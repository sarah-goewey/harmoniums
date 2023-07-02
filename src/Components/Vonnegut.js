import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store";

const Vonnegut = () => {
  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();
  return (
    <div>
      <div>
        <h2>From The Sirens of Titan by Kurt Vonnegut</h2>
        <h3>Chapter Eight</h3>
        <p>There are creatures in the deep caves of Mercury.</p>
        <p>
          The song their planet sings is important to them, for the creatures
          are nourished by vibrations. They feed on mechanical energy.
        </p>
        <p>The creatures cling to the singing walls of their caves.</p>
        <p>In that way, they eat the song of Mercury.</p>
        <p>The caves of Mercury are cozily warm in their depths.</p>
        <p>
          The walls of the caves in their depths are phosphorescent. They give
          off a jonquil-yellow light.
        </p>
        <p>
          The creatures in the caves are translucent. When they cling to the
          walls, light from the phosphorescent walls comes right through them.
          The yellow light from the walls, however, is turned, when passed
          through the bodies of the creatures, to a vivid aquamarine.
        </p>
        <p>Nature is a wonderful thing.</p>
        <p>
          The creatures in the caves look very much like small and spineless
          kites. They are diamond-shaped, a foot high and eight inches wide when
          fully mature.
        </p>
        <p>They have no more thickness than the skin of a toy balloon.</p>
        <p>
          Each creature has four feeble suction cups – one at each of its
          corners. These cups enable it to creep, something like a measuring
          worm, and to cling, and to feel out the places where the song of
          Mercury is best.
        </p>
        <p>
          Having found a place that promises a good meal, the creatures lay
          themselves against the wall like wet wallpaper.
        </p>
        <p>
          There is no need for a circulatory system in the creatures. They are
          so thin that life-giving vibrations can make all their cells tingle
          without intermediaries.
        </p>
        <p>The creatures do not excrete.</p>
        <p>
          The creatures reproduce by flaking. The young, when shed by a parent,
          are indistinguishable from dandruff.
        </p>
        <p>There is only one sex.</p>
        <p>
          Every creature simply sheds flakes of his own kind, and his own kind
          is like everybody else’s kind.
        </p>
        <p>
          There is no childhood as such. Flakes begin flaking three Earthling
          hours after they themselves have been shed.
        </p>
        <p>
          They do not reach maturity, then deteriorate and die. They reach
          maturity and stay in full bloom, so to speak, for as long as Mercury
          cares to sing.
        </p>
        <p>
          There is no way in which one creature can harm another, and no motive
          for one’s harming another.
        </p>
        <p>
          Hunger, envy, ambition, fear, indignation, religion, and sexual lust
          are irrelevant and unknown.
        </p>
        <p>The creatures have only one sense: touch.</p>
        <p>
          They have weak powers of telepathy. The messages they are capable of
          transmitting and receiving are almost as monotonous as the song of
          Mercury. They have only two possible messages. The first is an
          automatic response to the second, and the second is an automatic
          response to the first.
        </p>
        <p>The first is, ”Here I am, here I am, here I am.”</p>
        <p>
          The second is, ”So glad you are, so glad you are, so glad you are”
        </p>
        <p>
          There is one last characteristic of the creatures that has not been
          explained on utilitarian grounds: the creatures seem to like to
          arrange themselves in striking patterns on the phosphorescent walls.
        </p>
        <p>
          Though blind and indifferent to anyone’s watching, they often arrange
          themselves so as to present a regular and dazzling pattern of
          jonquil-yellow and vivid aquamarine diamonds. The yellow comes from
          the bare cave walls. The aquamarine is the light of the walls filtered
          through the bodies of the creatures.
        </p>
        <p>
          Because of their love for music and their willingness to deploy
          themselves in the service of beauty, the creatures are given a lovely
          name by Earthlings.
        </p>
        <p>They are called harmoniums.</p>
      </div>
    </div>
  );
};

export default Vonnegut;
